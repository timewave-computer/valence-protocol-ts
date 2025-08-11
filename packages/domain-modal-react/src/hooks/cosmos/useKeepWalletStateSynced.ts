'use client';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { ChainType } from '@/hooks/common';
import { cosmosWalletAtom } from '@/hooks/cosmos/store';
import { useAccount as useCosmosAccount } from 'graz';
import { getCosmosWalletInfo } from './const';

/***
 * Keeps wallet metadata synced
 */
export const useKeepCosmosWalletStateSynced = () => {
  const [cosmosWallet, setCosmosWallet] = useAtom(cosmosWalletAtom);

  const { data: cosmosAccounts, walletType } = useCosmosAccount({
    multiChain: true,
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
    if (walletType && currentCosmosAddress !== cosmosWallet?.id) {
      updateCosmosWallet();
    }
  }, [walletType, currentCosmosAddress, cosmosWallet, updateCosmosWallet]);
};
