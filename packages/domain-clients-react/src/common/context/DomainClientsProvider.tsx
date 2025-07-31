import  { createContext, ReactNode, useMemo } from 'react';
import { type Config as WagmiConfig } from 'wagmi';
import { EvmClientProvider } from '@/evm';
// import { DomainCosmosProvider } from '@/cosmos'; // TODO: Import when available

export interface DomainClientsConfig {
  evm?: WagmiConfig;
  cosmos?: Record<string, unknown>;
}

export const DomainClientsConfigContext = createContext<DomainClientsConfig | undefined>(undefined);


export const DomainClientsProvider = ({ config, children }: { config: DomainClientsConfig; children: ReactNode }) => {
  // TODO: check if tree-shaking works with this method
  const content = useMemo(() => {
    let result = children;
    
    // TODO: Add cosmos provider when available
    // if (config.cosmos) {
    //   result = <ValenceDomainCosmosProvider>{result}</ValenceDomainCosmosProvider>;
    // }
    
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







