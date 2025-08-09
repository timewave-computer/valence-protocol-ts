"use client";
import { WalletType, getWallet, connect, useDisconnect, getChainInfo } from "graz";
import { ChainType } from "@/common";
import { useMemo } from "react";
import { getCosmosWalletInfo } from "@/cosmos/const";
import { type CosmosConnector } from "@/cosmos/types";
import {  cosmosWalletAtom } from "@/cosmos/store";
import {  useSetAtom } from "jotai";

export const useCosmosConnectors = ():CosmosConnector[] => {
    const { disconnectAsync } = useDisconnect();

    const setCosmosWallet = useSetAtom(cosmosWalletAtom);



    const cosmosConnectors = useMemo(() => {
        const connectorList: CosmosConnector[] = [];

        const supportedWallets = getSupportedCosmosConnectors();

        const connectWallet = async (walletType:WalletType,chainId:string) => {

          const chainInfo = getChainInfo({chainId});
          const wallet = getWallet(walletType);
          const walletInfo = getCosmosWalletInfo(walletType);
    
          if (!wallet) {
            throw new Error("Wallet not found");
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
            throw new Error("failed to get accounts from wallet");
          }
    
            const address = response?.accounts[chainId].bech32Address;
    
          if (!address) {
            throw new Error("failed to get address from wallet");
          }
    
          setCosmosWallet({
            id: walletType,
            walletName: walletInfo.name,
            chainType: ChainType.Cosmos,
            logo: walletInfo.imgSrc,
          });
        }

        supportedWallets.forEach(walletType => {
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
                connect: (chainId:string) => connectWallet(walletType, chainId),
    
            })
        })

        return connectorList;
    }, [disconnectAsync]);

  return cosmosConnectors;
};

const getSupportedCosmosConnectors = () => {
    const browserWallets = [WalletType.KEPLR, WalletType.LEAP, WalletType.OKX];

  return browserWallets;
};
