import  { createContext, useContext, ReactNode } from 'react';
import { type Config as WagmiConfig } from 'wagmi';

export interface ValenceDomainClientsConfig {
  evm?: WagmiConfig;
  cosmos?: Record<string, unknown>;
}

export const ValenceDomainClientsConfigContext = createContext<ValenceDomainClientsConfig | undefined>(undefined);

export const ValenceDomainClientsProvider = ({ config, children }: { config: ValenceDomainClientsConfig; children: ReactNode }) => {
  return (
    <ValenceDomainClientsConfigContext.Provider value={config}>
      {children}
    </ValenceDomainClientsConfigContext.Provider>
  );
};







