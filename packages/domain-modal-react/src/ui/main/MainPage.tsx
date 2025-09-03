'use client';
import { type ReactNode, useMemo } from 'react';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ModalPage, ConnectDomainButton } from '@/ui/main';
import { useIsCosmosChainConnected } from '@/hooks/cosmos';
import { useIsEvmChainConnected } from '@/hooks/evm';
import { useIsSolanaChainConnected } from '@/hooks/solana';
import { CosmosConnection } from '@/ui/cosmos';
import { EvmConnection } from '@/ui/evm';
import { SolanaConnection } from '@/ui/solana';

export const MainPage = ({
  onSelect,
}: {
  onSelect: (page: ModalPage) => void;
}) => {
  const config = useDomainConfig();
  const isCosmosChainConnected = useIsCosmosChainConnected();
  const isEvmChainConnected = useIsEvmChainConnected();
  const isSolanaChainConnected = useIsSolanaChainConnected();

  const { connectedDomains, unconnectedDomains } = useMemo(() => {
    const connected: ReactNode[] = [];
    const unconnected: ReactNode[] = [];

    if (config.evm && !config.evm.hide) {
      if (isEvmChainConnected)
        connected.push(
          <Connection title='Ethereum Wallet' children={<EvmConnection />} />
        );
      else
        unconnected.push(
          <ConnectDomainButton onClick={() => onSelect(ModalPage.EVM)}>
            Connect Ethereum Wallet
          </ConnectDomainButton>
        );
    }

    if (config.solana && !config.solana.hide) {
      if (isSolanaChainConnected)
        connected.push(
          <Connection title='Solana Wallet' children={<SolanaConnection />} />
        );
      else
        unconnected.push(
          <ConnectDomainButton onClick={() => onSelect(ModalPage.SOLANA)}>
            Connect Solana Wallet
          </ConnectDomainButton>
        );
    }

    if (config.cosmos && !config.cosmos.hide) {
      if (isCosmosChainConnected)
        connected.push(
          <Connection title='Cosmos Wallet' children={<CosmosConnection />} />
        );
      else
        unconnected.push(
          <ConnectDomainButton onClick={() => onSelect(ModalPage.COSMOS)}>
            Connect Cosmos Wallet
          </ConnectDomainButton>
        );
    }

    return {
      connectedDomains: connected,
      unconnectedDomains: unconnected,
    };
  }, [isCosmosChainConnected, isEvmChainConnected, isSolanaChainConnected]);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-bold pb-2'>Select a Wallet</p>

      <div className='flex flex-col gap-2'>
        {connectedDomains.map((domain, index) => (
          <div key={`connected-${index}`}>{domain}</div>
        ))}

        {unconnectedDomains.map((domain, index) => (
          <div key={`unconnected-${index}`}>{domain}</div>
        ))}
      </div>
    </div>
  );
};

const Connection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <h2 className='text-base font-bold'>{title}</h2>
      {children}
    </div>
  );
};
