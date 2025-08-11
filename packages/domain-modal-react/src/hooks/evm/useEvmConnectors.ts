'use client';
import { useConnectors, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useMemo } from 'react';
import {
  evmWalletAtom,
  type EvmConnector,
  useKeepEvmWalletStateSynced,
  ChainType,
} from '@/hooks';
import { useSetAtom } from 'jotai';

export const useEvmConnectors = (): EvmConnector[] => {
  const connectors = useConnectors();
  const {
    connector: evmConnector,
    isConnected: isEvmConnected,
    chainId: connectorChainId,
  } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  const setEvmWallet = useSetAtom(evmWalletAtom);

  useKeepEvmWalletStateSynced();

  const evmConnectors = useMemo(() => {
    const connectorList: EvmConnector[] = [];

    connectors.forEach(connector => {
      // same wallet can be injected multiple times
      // TODO: this workaround may cause issues in the future, depending on which wallet user intends to use
      const isConnectorAdded =
        connectorList.findIndex(
          c => c.walletInfo.walletName === connector.id
        ) !== -1;
      if (isConnectorAdded) {
        return;
      }

      const connectWallet = async (chainId?: number) => {
        const walletConnectedButNeedToSwitchChain =
          isEvmConnected &&
          chainId !== connectorChainId &&
          connector.id === evmConnector?.id;

        if (isEvmConnected && connector.id !== evmConnector?.id) {
          await disconnect();
        }
        if (walletConnectedButNeedToSwitchChain) {
          await connector?.switchChain?.({
            chainId: Number(chainId),
          });
        }

        await connectAsync({ connector, chainId });

        setEvmWallet({
          id: connector.id,
          walletInfo: {
            walletName: connector.name,
            walletPrettyName: connector.name,
            logo: connector.icon,
          },
          chainType: ChainType.Evm,
        });
      };

      connectorList.push({
        chainType: ChainType.Evm,
        walletInfo: {
          logo: connector.icon,
          walletName: connector.id,
          walletPrettyName: connector.name,
        },
        isAvailable: true, // always true because the connector was found in browser context
        connect: (chainId?: number) => connectWallet(chainId),
      });
    });

    return connectorList;
  }, [connectors, disconnect]);

  return evmConnectors;
};
