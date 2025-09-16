'use client';
import { type ReactNode, useMemo } from 'react';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ModalPage, ConnectDomainButton } from '@/ui/main';
import { CosmosConnection } from '@/ui/cosmos';
import { EvmConnection } from '@/ui/evm';
import { SolanaConnection } from '@/ui/solana';

export const MainPage = ({
  onSelect,
}: {
  onSelect: (page: ModalPage) => void;
}) => {
  const config = useDomainConfig();

  const { connectedDomains, unconnectedDomains } = useMemo(() => {
    /** Note, all connect buttons and connections are rendered optimistically, and decided whether to show them or not is offloaded to the component itself
     * This allows us to avoid using hooks that might not have a peer dependency installed
     */
    const connected: ReactNode[] = [];
    const unconnected: ReactNode[] = [];

    const configEntries = Object.entries(config);

    for (const [domain, config] of configEntries) {
      if (config[domain] && !config[domain].hide) {
        if (domain === 'evm') {
          connected.push(
            <Connection title='Ethereum Wallet' children={<EvmConnection />} />
          );
          unconnected.push(
            <ConnectDomainButton onClick={() => onSelect(ModalPage.EVM)}>
              Connect Ethereum Wallet
            </ConnectDomainButton>
          );
        }
        if (domain === 'solana') {
          connected.push(
            <Connection title='Solana Wallet' children={<SolanaConnection />} />
          );
          unconnected.push(
            <ConnectDomainButton onClick={() => onSelect(ModalPage.SOLANA)}>
              Connect Solana Wallet
            </ConnectDomainButton>
          );
        }
        if (domain === 'cosmos') {
          connected.push(
            <Connection title='Cosmos Wallet' children={<CosmosConnection />} />
          );
          unconnected.push(
            <ConnectDomainButton onClick={() => onSelect(ModalPage.COSMOS)}>
              Connect Cosmos Wallet
            </ConnectDomainButton>
          );
        }
      }
    }

    return {
      connectedDomains: connected,
      unconnectedDomains: unconnected,
    };
  }, [config]);

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
