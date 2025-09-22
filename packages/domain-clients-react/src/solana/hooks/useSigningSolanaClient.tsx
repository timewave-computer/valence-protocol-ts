'use client';
import { useSolanaConfig } from '@/solana/hooks';
import { useCallback } from 'react';
import { SigningSolanaClient } from '@valence-protocol/domain-clients-core/solana';
import { useMemo, useRef } from 'react';
import { SolanaClusterId } from '@wallet-ui/react';
import { useWalletUiSigner, useWalletUiAccount } from '@wallet-ui/react';
import { TransactionModifyingSigner } from '@solana/signers';
import { getTransactionCodec } from '@solana/transactions';
import { address } from 'gill';
import {
  SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED,
  SolanaError,
} from '@solana/errors';
import { getAbortablePromise } from '@solana/promises';
import {
  SolanaSignAndSendTransaction,
  SolanaSignTransaction,
  SolanaSignTransactionFeature,
  SolanaSignTransactionInput,
  SolanaSignTransactionOutput,
} from '@solana/wallet-standard-features';
import {
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
  WalletStandardError,
} from '@wallet-standard/errors';
import { getWalletAccountFeature, UiWalletAccount } from '@wallet-standard/ui';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from '@wallet-standard/ui-registry';

/***
 * !!! NOTE: There is a bug where useWalletUiSigner() expects an account in early rendering and throws an error
 * The workaround is to check for an account this useWalletUiAccount(), and conditionally render the component using this hook if the account exists
 * GH issue: https://github.com/wallet-ui/wallet-ui/issues/270
 */
export const useSigningSolanaClient = ({
  clusterId,
}: {
  clusterId: SolanaClusterId;
}): SigningSolanaClient | undefined => {
  const config = useSolanaConfig();
  const { account } = useWalletUiAccount();
  const signer = useWalletAccountTransactionSigner(clusterId, account);

  const signingClient = useMemo(() => {
    if (!signer) {
      return;
    }
    const cluster = config.clusters.find(cluster => cluster.id === clusterId);
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterId} not found in config`);
    }

    return new SigningSolanaClient({
      rpcUrl: cluster.urlOrMoniker,
      signer,
    });
  }, [config, clusterId, signer]);

  return signingClient;
};

export function useWalletAccountTransactionSigner<
  TWalletAccount extends UiWalletAccount,
>(
  chain: `solana:${string}`,
  uiWalletAccount?: TWalletAccount
): TransactionModifyingSigner<TWalletAccount['address']> {
  const encoderRef = useRef<ReturnType<typeof getTransactionCodec> | null>(
    null
  );
  const signTransaction = useSignTransaction(chain, uiWalletAccount);
  return useMemo(
    () => ({
      address: address(uiWalletAccount?.address ?? ''),
      async modifyAndSignTransactions(transactions, config = {}) {
        const { abortSignal, ...options } = config;
        abortSignal?.throwIfAborted();
        const transactionCodec = (encoderRef.current ||= getTransactionCodec());
        if (transactions.length > 1) {
          throw new SolanaError(
            SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED
          );
        }
        if (transactions.length === 0) {
          return transactions;
        }
        const [transaction] = transactions;
        const wireTransactionBytes = transactionCodec.encode(transaction);
        const inputWithOptions = {
          ...options,
          transaction: wireTransactionBytes as Uint8Array,
        };
        const { signedTransaction } = await getAbortablePromise(
          signTransaction(inputWithOptions),
          abortSignal
        );
        const decodedSignedTransaction = transactionCodec.decode(
          signedTransaction
        ) as (typeof transactions)[number];
        return Object.freeze([decodedSignedTransaction]);
      },
    }),
    [uiWalletAccount?.address, signTransaction]
  );
}

type OnlySolanaChains = `solana:${string}`;

export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
  chain: OnlySolanaChains,
  uiWalletAccount?: TWalletAccount
): (input: Input) => Promise<Output>;
export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
  uiWalletAccount: TWalletAccount,
  chain: `solana:${string}`
): (input: Input) => Promise<Output>;
export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
  uiWalletAccount: TWalletAccount,
  chain: `solana:${string}`
): (input: Input) => Promise<Output> {
  const signTransactions = useSignTransactions(uiWalletAccount, chain);
  return useCallback(
    async input => {
      const [result] = await signTransactions(input);
      return result;
    },
    [signTransactions]
  );
}

function useSignTransactions<TWalletAccount extends UiWalletAccount>(
  uiWalletAccount: TWalletAccount,
  chain: `solana:${string}`
): (...inputs: readonly Input[]) => Promise<readonly Output[]> {
  if (!uiWalletAccount.chains.includes(chain)) {
    throw new WalletStandardError(
      WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
      {
        address: uiWalletAccount.address,
        chain,
        featureName: SolanaSignAndSendTransaction,
        supportedChains: [...uiWalletAccount.chains],
        supportedFeatures: [...uiWalletAccount.features],
      }
    );
  }
  const signTransactionFeature = getWalletAccountFeature(
    uiWalletAccount,
    SolanaSignTransaction
  ) as SolanaSignTransactionFeature[typeof SolanaSignTransaction];
  const account =
    getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(
      uiWalletAccount
    );
  return useCallback(
    async (...inputs) => {
      const inputsWithAccountAndChain = inputs.map(({ options, ...rest }) => {
        const minContextSlot = options?.minContextSlot;
        return {
          ...rest,
          account,
          chain,
          ...(minContextSlot != null
            ? {
                options: {
                  minContextSlot: Number(minContextSlot),
                },
              }
            : null),
        };
      });
      const results = await signTransactionFeature.signTransaction(
        ...inputsWithAccountAndChain
      );
      return results;
    },
    [signTransactionFeature, account, chain]
  );
}

type Input = Readonly<
  Omit<SolanaSignTransactionInput, 'account' | 'chain' | 'options'> & {
    options?: Readonly<{
      minContextSlot?: bigint;
    }>;
  }
>;
type Output = SolanaSignTransactionOutput;
