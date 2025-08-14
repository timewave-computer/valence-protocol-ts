'use client';
import { useMemo, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import {
  WalletType,
  getWallet,
  connect,
  useDisconnect,
  getChainInfo,
} from 'graz';
import { ChainType } from '@/hooks/common';
import {
  cosmosWalletAtom,
  type CosmosConnector,
  getCosmosWalletInfo,
  supportedCosmosWallets,
} from '@/hooks/cosmos';
import { useKeepCosmosWalletStateSynced } from '@/hooks/cosmos';

export const useCosmosConnectors = (): CosmosConnector[] => {
  const { disconnectAsync } = useDisconnect();
  useKeepCosmosWalletStateSynced();
  const setCosmosWallet = useSetAtom(cosmosWalletAtom);

  const connectWallet = useCallback(
    async (walletType: WalletType, chainId: string) => {
      const chainInfo = getChainInfo({ chainId });
      const wallet = getWallet(walletType);
      const walletInfo = getCosmosWalletInfo(walletType);

      if (!wallet) {
        throw new Error('Wallet not found');
      }
      if (walletType === WalletType.KEPLR && !!chainInfo) {
        await wallet.experimentalSuggestChain(chainInfo);
      }

      const response = await connect({
        chainId: chainId,
        walletType: walletType,
        autoReconnect: false,
      });

      if (!response?.accounts) {
        throw new Error('failed to get accounts from wallet');
      }

      const address = response?.accounts[chainId].bech32Address;

      if (!address) {
        throw new Error('failed to get address from wallet');
      }
      updateCosmosWallet({
        walletType,
        walletInfo: {
          walletName: walletInfo.name,
          walletPrettyName: walletInfo.name,
          logo: walletInfo.imgSrc,
        },
      });
    },
    [disconnectAsync, setCosmosWallet]
  );

  const updateCosmosWallet = useCallback(
    async ({
      walletType,
      walletInfo,
    }: {
      walletType: WalletType;
      walletInfo: {
        walletName: string;
        walletPrettyName: string;
        logo: string;
      };
    }) => {
      setCosmosWallet({
        id: walletType,
        walletInfo: {
          walletName: walletInfo.walletName,
          walletPrettyName: walletInfo.walletPrettyName,
          logo: walletInfo.logo,
        },
        chainType: ChainType.Cosmos,
      });
    },
    [disconnectAsync, setCosmosWallet]
  );

  const cosmosConnectors = useMemo(() => {
    const connectorList: CosmosConnector[] = [];

    supportedCosmosWallets.forEach(walletType => {
      const walletInfo = getCosmosWalletInfo(walletType);

      connectorList.push({
        chainType: ChainType.Cosmos,
        walletInfo: {
          logo: walletInfo.imgSrc,
          walletName: walletInfo.name,
          walletPrettyName: walletInfo.name,
        },
        isAvailable: (() => {
          try {
            const w = getWallet(walletType);
            return Boolean(w);
          } catch (_error) {
            return false;
          }
        })(),
        connect: (chainId: string) => connectWallet(walletType, chainId),
      });
    });

    return connectorList;
  }, [disconnectAsync]);

  return cosmosConnectors;
};
