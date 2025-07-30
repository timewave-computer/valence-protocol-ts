import React, { createContext, useContext, ReactNode } from 'react';

// Types for config
export interface ValenceDomainClientsConfig {
  evm?: Record<string, any>; // flexible, per-chain config
  cosmos?: Record<string, any>; // flexible, per-chain config
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