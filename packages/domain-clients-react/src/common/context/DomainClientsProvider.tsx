'use client';
import { createContext, ReactNode, useContext } from 'react';
import { EvmClientProvider } from '@/evm';
import { CosmosClientProvider } from '@/cosmos';
import { SolanaClientProvider } from '@/solana';
import { CosmosConfig } from '@valence-protocol/domain-clients-core/cosmos';
import { EvmConfig } from '@valence-protocol/domain-clients-core/evm';
import { SolanaConfig } from '@valence-protocol/domain-clients-core/solana';

export interface DomainClientsConfig {
  evm?: EvmConfig;
  cosmos?: CosmosConfig;
  solana?: SolanaConfig;
}

const DomainClientsConfigContext = createContext<
  DomainClientsConfig | undefined
>(undefined);

export const DomainClientsProvider = ({
  config,
  children,
}: {
  config: DomainClientsConfig;
  children: ReactNode;
}) => {
  // TODO: this is not tree-shakable
  return (
    <DomainClientsConfigContext.Provider value={config}>
      <SolanaClientProvider>
        <EvmClientProvider>
          <CosmosClientProvider>{children}</CosmosClientProvider>
        </EvmClientProvider>
      </SolanaClientProvider>
    </DomainClientsConfigContext.Provider>
  );
};

export function useDomainConfig() {
  const config = useContext(DomainClientsConfigContext);
  if (!config)
    throw new Error(
      'useDomainConfig must be used within a DomainClientsProvider'
    );
  return config;
}
