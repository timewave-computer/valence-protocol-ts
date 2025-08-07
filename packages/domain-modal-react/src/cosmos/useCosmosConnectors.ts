import { WalletType, getWallet, connect, useDisconnect } from "graz";
import { ChainType, type DomainConnector } from "@/common";
import { useMemo } from "react";
import { getCosmosWalletInfo } from "@/cosmos/const";

export type CosmosConnector = Omit<DomainConnector, 'connect' | 'disconnect'> & {
    connect: (chainId: string) => Promise<void>;
    disconnect: (chainId?: string) => Promise<void>;
}

export const useCosmosConnectors = ():CosmosConnector[] => {
    const { disconnectAsync } = useDisconnect();


    const cosmosConnectors = useMemo(() => {
        const connectorList: CosmosConnector[] = [];

        const supportedWallets = getSupportedCosmosConnectors();

        supportedWallets.forEach(walletType => {
            const walletInfo = getCosmosWalletInfo(walletType);
    
            connectorList.push({
                walletName: walletInfo.name,
                walletPrettyName: walletInfo.name,
                walletChainType: ChainType.Cosmos,
                walletInfo: {
                  logo: walletInfo.imgSrc,
                },
                isAvailable: (() => {
                  try {
                    const w = getWallet(walletType);
                    return Boolean(w);
                  } catch (_error) {
                    return false;
                  }
                })(),
                connect: async (chainId: string) => {
                  await connect({  chainId,
                    walletType: walletType,
                    autoReconnect: false, });
                },
                disconnect: async (chainId?: string) => {
                  await disconnectAsync({ chainId });
                },
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
