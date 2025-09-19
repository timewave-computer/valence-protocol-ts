'use client';
import { useSolanaConfig } from '@/solana/hooks';
import { SigningSolanaClient } from '@valence-protocol/domain-clients-core/solana';
import { useMemo } from 'react';
import { SolanaClusterId } from '@wallet-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletAccountTransactionSigner } from '@solana/react';

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

  const { wallet } = useWallet();
  const signer = useWalletAccountTransactionSigner(account, clusterId);

  const signingClient = useMemo(() => {
    if (!wallet?.adapter) {
      return;
    }
    const cluster = config.clusters.find(cluster => cluster.id === clusterId);
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterId} not found in config`);
    }

    return new SigningSolanaClient({
      rpcUrl: cluster.urlOrMoniker,
      signer: wallet.adapter,
    });
  }, [config, clusterId, wallet?.adapter]);

  return signingClient;
};
