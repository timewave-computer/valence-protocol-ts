import { useDomainConfig } from "@/common";
import { type Config } from 'wagmi';


export type WagmiConfig = Config; // for better type inference
export function useEvmConfig(): WagmiConfig {
    const config = useDomainConfig();
    if (!config.evm) throw new Error('useEvmConfig must be used within a DomainClientsProvider');
    return config.evm;
  }
  