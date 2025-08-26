'use client';
/***
 * !! Important: Keeps wallet metadata synced !!
 * Required for handling external wallet state changes, and page reloads
 */

import { useAtom } from 'jotai';
import { solanaWalletAtom } from '@/hooks/solana';
import { useWalletUi } from '@wallet-ui/react';
import { useCallback, useEffect } from 'react';
import { ChainType } from '@/hooks/common';

export const useKeepSolanaWalletStateSynced = () => {
  const [solanaWallet, setSolanaWallet] = useAtom(solanaWalletAtom);

  const { account, wallet } = useWalletUi();

  const updateSolanaWallet = useCallback(async () => {
    if (!account || !wallet) {
      setSolanaWallet(undefined);
      return;
    }
    setSolanaWallet({
      id: account.address,
      walletInfo: {
        walletName: wallet.name,
        walletPrettyName: wallet.name,
        logo: wallet.icon,
      },
      chainType: ChainType.Solana,
    });
  }, [account, wallet]);

  useEffect(() => {
    if (account && solanaWallet?.id !== account.address) {
      updateSolanaWallet();
    }
  }, [account, solanaWallet, updateSolanaWallet]);
};
