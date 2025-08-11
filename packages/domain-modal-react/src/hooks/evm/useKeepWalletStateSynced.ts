'use client';
import { evmWalletAtom } from '@/hooks/evm';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useAccount as useEvmAccount } from 'wagmi';
import { ChainType } from '@/hooks/common';

/***
 * Keeps wallet metadata synced
 */
export const useKeepEvmWalletStateSynced = () => {
  const [evmWallet, setEvmWallet] = useAtom(evmWalletAtom);

  const evmAccount = useEvmAccount();

  const updateEvmWallet = useCallback(async () => {
    const provider = await evmAccount.connector?.getProvider?.();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const walletConnectMetadata = (provider as any)?.session?.peer?.metadata;

    if (evmAccount.connector) {
      setEvmWallet({
        id: evmAccount.address,
        walletInfo: {
          walletName: evmAccount.connector.id,
          walletPrettyName: evmAccount.connector.name,
          logo: walletConnectMetadata?.icons[0] ?? evmAccount.connector?.icon,
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
