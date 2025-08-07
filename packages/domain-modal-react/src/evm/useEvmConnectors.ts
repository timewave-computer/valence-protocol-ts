'use client';
import {  ChainType, type DomainConnector } from "@/common";
import {  useConnectors, useDisconnect } from "wagmi";
import { useMemo } from "react";

export const useEvmConnectors = (): DomainConnector[] => {
  const connectors = useConnectors();


  const { disconnect } = useDisconnect();

  const evmConnectors = useMemo(() => {
    const connectorList: DomainConnector[] = [];

    connectors.forEach(connector => {
      // same wallet can be injected multiple times
      // TODO: this workaround may cause issues in the future, depending on which wallet user intends to use
      const isConnectorAdded = connectorList.findIndex(c => c.walletName === connector.id) !== -1;
      if (isConnectorAdded) {
        return
      } 
        
      connectorList.push({
        walletName: connector.id,
        walletPrettyName: connector.name,
        walletChainType: ChainType.Evm,
        walletInfo: {
          logo: connector.icon,
        },
        isAvailable: true, // always true because the connector was found in browser context
        connect: async () => {
          await connector.connect();
        },
        disconnect: async () => {
          await disconnect();
        },
      })
    });
  
    return connectorList;
  },[connectors,disconnect])

  return evmConnectors;
};