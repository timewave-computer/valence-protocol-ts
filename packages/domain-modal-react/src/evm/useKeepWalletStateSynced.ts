"use client";
import { evmWalletAtom } from "@/evm";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { useAccount as useEvmAccount } from "wagmi";
import { ChainType } from "@/common";

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
        walletName: evmAccount.connector.id,
        chainType: ChainType.Evm,
        logo: walletConnectMetadata?.icons[0] ?? evmAccount.connector?.icon,
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