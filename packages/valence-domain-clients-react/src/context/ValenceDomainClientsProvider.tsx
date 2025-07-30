import  { createContext, useContext, ReactNode } from 'react';

export interface ValenceDomainClientsConfig {
  evm?: Record<string, unknown>;
  cosmos?: Record<string, unknown>; 
}

const ValenceDomainClientsConfigContext = createContext<ValenceDomainClientsConfig | undefined>(undefined);

export const ValenceDomainClientsProvider = ({ config, children }: { config: ValenceDomainClientsConfig; children: ReactNode }) => {
  return (
    <ValenceDomainClientsConfigContext.Provider value={config}>
      {children}
    </ValenceDomainClientsConfigContext.Provider>
  );
};

export function useValenceDomainConfig(chainId?: string) {
  const config = useContext(ValenceDomainClientsConfigContext);
  if (!config) throw new Error('useValenceDomainConfig must be used within a ValenceDomainClientsProvider');
  if (chainId) {
    // Try to find config for this chainId in evm or cosmos
    const evm = config.evm?.[chainId];
    const cosmos = config.cosmos?.[chainId];
    return evm || cosmos || undefined;
  }
  return config;
} 