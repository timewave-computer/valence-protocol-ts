import  { createContext, ReactNode, useMemo } from 'react';
import { EvmClientProvider } from '@/evm';
import { CosmosClientProvider } from '@/cosmos';
import { CosmosConfig } from '@valence-protocol/domain-clients-core/cosmos';
import { EvmConfig } from '@valence-protocol/domain-clients-core/evm';

export interface DomainClientsConfig {
  evm?: EvmConfig;
  cosmos?: CosmosConfig;
}

export const DomainClientsConfigContext = createContext<DomainClientsConfig | undefined>(undefined);


export const DomainClientsProvider = ({ config, children }: { config: DomainClientsConfig; children: ReactNode }) => {
  // TODO: check if tree-shaking works with this method
  const content = useMemo(() => {
    let result = children;
    
    if (config.cosmos) {
      result = <CosmosClientProvider>{result}</CosmosClientProvider>;
    }
    
    if (config.evm) {
      result = <EvmClientProvider>{result}</EvmClientProvider>;
    }
    
    return result;
  }, [children, config.evm, config.cosmos]);

  return (
    <DomainClientsConfigContext.Provider value={config}>
      {content}
    </DomainClientsConfigContext.Provider>
  );
};







