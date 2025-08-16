'use client';
import { evmWalletAtom } from '@/hooks/evm';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useAccount as useEvmAccount } from 'wagmi';
import { ChainType } from '@/hooks/common';

/***
 * !! Important: Keeps wallet metadata synced !!
 * Required for handling external wallet state changes, and page reloads
 */
export const useKeepEvmWalletStateSynced = () => {
  const [evmWallet, setEvmWallet] = useAtom(evmWalletAtom);

  const evmAccount = useEvmAccount();

  const updateEvmWallet = useCallback(async () => {
    if (evmAccount.connector) {
      setEvmWallet({
        id: evmAccount.address,
        walletInfo: {
          walletName: evmAccount.connector.name,
          walletPrettyName: evmAccount.connector.name,
          logo: evmAccount.connector?.icon,
        },
        chainType: ChainType.Evm,
      });
    }
  }, [evmAccount.address, evmAccount.connector, setEvmWallet]);

  useEffect(() => {
    if (evmAccount.connector && evmWallet?.id !== evmAccount.address) {
      updateEvmWallet();
    }
  }, [
    evmAccount,
    evmWallet,
    setEvmWallet,
    updateEvmWallet,
    evmAccount.address,
  ]);
};
