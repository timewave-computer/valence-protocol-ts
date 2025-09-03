'use client';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import {
  type UiWallet,
  type UiWalletAccount,
  useWalletUi,
} from '@wallet-ui/react';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { ChainType } from '@/hooks/common';
import {
  solanaWalletAtom,
  type SolanaConnector,
  useKeepSolanaWalletStateSynced,
} from '@/hooks/solana';

export const useSolanaConnectors = (): SolanaConnector[] => {
  const { wallets, connect } = useWalletUi();

  useKeepSolanaWalletStateSynced();

  const config = useSolanaConfig();
  const setSolanaWallet = useSetAtom(solanaWalletAtom);

  if (!config) {
    throw new Error(
      'Attempting to use SolanaConnectors with undefined solana config'
    );
  }

  const connectWallet = useCallback(
    async (wallet: UiWallet, account: UiWalletAccount) => {
      connect(account);
      setSolanaWallet({
        id: account.address,
        walletInfo: {
          walletName: wallet.name,
          walletPrettyName: wallet.name,
          logo: wallet.icon,
        },
        chainType: ChainType.Solana,
      });
    },
    []
  );

  const connectors: SolanaConnector[] = useMemo(() => {
    if (!wallets) {
      return [];
    }

    const connectorList: SolanaConnector[] = [];

    wallets.forEach(wallet => {
      connectorList.push({
        chainType: ChainType.Solana,
        walletInfo: {
          walletName: wallet.name,
          walletPrettyName: wallet.name,
          logo: wallet.icon,
        },
        wallet: wallet,
      });
    });
    return connectorList;
  }, [wallets, connectWallet]);

  return connectors;
};
