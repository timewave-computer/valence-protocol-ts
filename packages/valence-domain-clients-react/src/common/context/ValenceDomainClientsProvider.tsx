import  { createContext, ReactNode, useMemo } from 'react';
import { type Config as WagmiConfig } from 'wagmi';
import { ValenceDomainEvmProvider } from '@/evm';
// import { ValenceDomainCosmosProvider } from '@/cosmos'; // TODO: Import when available

export interface ValenceDomainClientsConfig {
  evm?: WagmiConfig;
  cosmos?: Record<string, unknown>;
}

export const ValenceDomainClientsConfigContext = createContext<ValenceDomainClientsConfig | undefined>(undefined);


export const ValenceDomainClientsProvider = ({ config, children }: { config: ValenceDomainClientsConfig; children: ReactNode }) => {
  // TODO: check if tree-shaking works with this method
  const content = useMemo(() => {
    let result = children;
    
    // TODO: Add cosmos provider when available
    // if (config.cosmos) {
    //   result = <ValenceDomainCosmosProvider>{result}</ValenceDomainCosmosProvider>;
    // }
    
    if (config.evm) {
      result = <ValenceDomainEvmProvider>{result}</ValenceDomainEvmProvider>;
    }
    
    return result;
  }, [children, config.evm, config.cosmos]);

  return (
    <ValenceDomainClientsConfigContext.Provider value={config}>
      {content}
    </ValenceDomainClientsConfigContext.Provider>
  );
};







