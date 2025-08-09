"use client";
import { useAtom} from "jotai";
import { useCallback, useEffect } from "react";
import { ChainType } from "@/common";
import { cosmosWalletAtom } from "@/cosmos/store";
import { useAccount as useCosmosAccount } from "graz";
import { getCosmosWalletInfo } from "./const";

/***
 * Keeps wallet metadata synced
 */
export const useKeepCosmosWalletStateSynced = () => {
  const  [cosmosWallet,setCosmosWallet] = useAtom(cosmosWalletAtom);

  const { data: cosmosAccounts, walletType } = useCosmosAccount({
    multiChain: true,
  });

  const currentCosmosAddress = cosmosAccounts
    ? cosmosAccounts[Object.keys(cosmosAccounts)[0]]?.bech32Address
    : "";

  const updateCosmosWallet = useCallback(async () => {
    if (cosmosAccounts && walletType && currentCosmosAddress) {
      const walletInfo = getCosmosWalletInfo(walletType);

      setCosmosWallet({
        id: currentCosmosAddress,
        walletName: walletType,
        chainType: ChainType.Cosmos,
        logo: walletInfo?.imgSrc,
      });
    }
  }, [cosmosAccounts, currentCosmosAddress, setCosmosWallet, walletType]);



  useEffect(() => {
    if (walletType && currentCosmosAddress !== cosmosWallet?.id) {
      updateCosmosWallet();
    }
  }, [
    walletType,
    currentCosmosAddress,
    cosmosWallet,
    updateCosmosWallet,
  ]);
};