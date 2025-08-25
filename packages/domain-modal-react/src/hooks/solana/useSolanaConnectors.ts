'use client';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useWalletUi, type UiWallet } from '@wallet-ui/react';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { solanaWalletAtom, type SolanaConnector } from '@/hooks/solana';
import { ChainType } from '@/index';

export const useSolanaConnectors = (): SolanaConnector[] => {
  const walletUi = useWalletUi();
  const { wallets } = walletUi;
  console.log('walletUI', walletUi);
  console.log('wallets', wallets);
  const config = useSolanaConfig();
  const setSolanaWallet = useSetAtom(solanaWalletAtom);

  if (!config) {
    throw new Error(
      'Attempting to use SolanaConnectors with undefined solana config'
    );
  }

  const connectWallet = useCallback(async (wallet: UiWallet) => {
    // await walletUi.connect(wallet.accounts[0]);
    console.log('connecting wallet', wallet);
  }, []);

  const connectors: SolanaConnector[] = useMemo(() => {
    return wallets?.map(wallet => ({
      chainType: ChainType.Solana,
      walletInfo: {
        walletName: wallet.name,
        walletPrettyName: wallet.name,
        logo: wallet.icon,
      },
      isAvailable: true,
      connect: () => connectWallet(wallet),
    }));
  }, [wallets, connectWallet]);

  return [];
};
