'use client';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useAccount as useCosmosAccount } from 'graz';
import { ChainType } from '@/hooks/common';
import { cosmosWalletAtom, getCosmosWalletInfo } from '@/hooks/cosmos';

/***
 * Keeps wallet metadata synced
 */
export const useKeepCosmosWalletStateSynced = () => {
  const [cosmosWallet, setCosmosWallet] = useAtom(cosmosWalletAtom);

  const {
    data: cosmosAccounts,
    walletType,
    isConnected,
  } = useCosmosAccount({
    multiChain: true,
    isConnected: true,
  });

  const currentCosmosAddress = cosmosAccounts
    ? cosmosAccounts[Object.keys(cosmosAccounts)[0]]?.bech32Address
    : '';

  const updateCosmosWallet = useCallback(async () => {
    if (cosmosAccounts && walletType && currentCosmosAddress) {
      const walletInfo = getCosmosWalletInfo(walletType);

      setCosmosWallet({
        id: currentCosmosAddress,
        walletInfo: {
          walletName: walletInfo?.name,
          walletPrettyName: walletInfo?.name,
          logo: walletInfo?.imgSrc,
        },
        chainType: ChainType.Cosmos,
      });
    }
  }, [cosmosAccounts, currentCosmosAddress, setCosmosWallet, walletType]);

  useEffect(() => {
    if (!isConnected) return;
    if (walletType && currentCosmosAddress !== cosmosWallet?.id) {
      updateCosmosWallet();
    }
  }, [
    isConnected,
    walletType,
    currentCosmosAddress,
    cosmosWallet,
    updateCosmosWallet,
  ]);
};
