'use client';
import {
  useConnectors,
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
} from 'wagmi';
import { useCallback, useMemo, useEffect } from 'react';
import { evmWalletAtom, type EvmConnector, ChainType } from '@/hooks';
import { useAtom } from 'jotai';

export const useEvmConnectors = (): EvmConnector[] => {
  const connectors = useConnectors();
  const {
    connector: evmConnector,
    isConnected: isEvmConnected,
    chainId: connectorChainId,
    address: evmAccountAddress,
  } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  const [evmWallet, setEvmWallet] = useAtom(evmWalletAtom);

  const connectWallet = async (chainId: number, connector: Connector) => {
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
      connect: (chainId: number) => connectWallet(chainId, connector),
      disconnect: async () => {
        await disconnect({ connector });
      },
      chainType: ChainType.Evm,
    });
  };

  const updateEvmWallet = useCallback(
    async (connector: Connector) => {
      if (evmConnector) {
        setEvmWallet({
          id: evmAccountAddress,
          walletInfo: {
            walletName: connector.name,
            walletPrettyName: connector.name,
            logo: connector?.icon,
          },
          chainType: ChainType.Evm,
          connect: (chainId: number) => connectWallet(chainId, connector),
          disconnect: async () => {
            await disconnect({ connector });
          },
        });
      }
    },
    [evmAccountAddress, evmAccountAddress, setEvmWallet]
  );

  useEffect(() => {
    if (evmConnector && evmWallet?.id !== evmAccountAddress) {
      updateEvmWallet(evmConnector);
    }
  }, [
    evmConnector,
    evmWallet,
    setEvmWallet,
    updateEvmWallet,
    evmAccountAddress,
  ]);

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

      connectorList.push({
        chainType: ChainType.Evm,
        walletInfo: {
          logo: connector.icon,
          walletName: connector.id,
          walletPrettyName: connector.name,
        },
        isAvailable: true, // always true because the connector was found in browser context
        connect: (chainId: number) => connectWallet(chainId, connector),
      });
    });

    return connectorList;
  }, [connectors, disconnect]);

  return evmConnectors;
};
