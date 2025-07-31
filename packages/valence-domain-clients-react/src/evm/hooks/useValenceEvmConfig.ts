import { useValenceDomainConfig } from "@/common";
import { type Config } from 'wagmi';


export type WagmiConfig = Config; // for better type inference
export function useValenceEvmConfig(): WagmiConfig {
    const config = useValenceDomainConfig();
    if (!config.evm) throw new Error('useValenceEvmConfig must be used within a ValenceDomainClientsProvider');
    return config.evm;
  }
  