'use client';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { ChainType } from '@/hooks/common';
import {
  solanaWalletAtom,
  type SolanaConnector,
  useKeepSolanaWalletStateSynced,
} from '@/hooks/solana';
import { useWallet, type Wallet } from '@solana/wallet-adapter-react';

export const useSolanaConnectors = (): SolanaConnector[] => {
  const { wallets, select } = useWallet();

  useKeepSolanaWalletStateSynced();

  const config = useSolanaConfig();
  const setSolanaWallet = useSetAtom(solanaWalletAtom);

  if (!config) {
    throw new Error(
      'Attempting to use SolanaConnectors with undefined solana config'
    );
  }

  const connectWallet = useCallback(async (wallet: Wallet) => {
    console.log('connecting wallet', wallet);
    await wallet.adapter.connect();
    setSolanaWallet({
      id: wallet.adapter.name,
      walletInfo: {
        walletName: wallet.adapter.name,
        walletPrettyName: wallet.adapter.name,
        logo: wallet.adapter.icon,
      },
      chainType: ChainType.Solana,
    });
  }, []);

  console.log('wallets', wallets);
  const connectors: SolanaConnector[] = useMemo(() => {
    if (!wallets) {
      return [];
    }

    const connectorList: SolanaConnector[] = [];

    wallets
      .filter(wallet => wallet.readyState === 'Installed')
      .forEach(wallet => {
        connectorList.push({
          chainType: ChainType.Solana,
          walletInfo: {
            walletName: wallet.adapter.name,
            walletPrettyName: wallet.adapter.name,
            logo: wallet.adapter.icon,
          },
          wallet: wallet,
          connect: () => connectWallet(wallet),
        });
      });
    return connectorList;
  }, [wallets, connectWallet]);

  console.log('connectors', connectors);

  return connectors;
};
