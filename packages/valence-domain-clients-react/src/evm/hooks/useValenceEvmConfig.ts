import { useValenceDomainConfig } from "@/common";

export function useValenceEvmConfig() {
    const config = useValenceDomainConfig();
    if (!config.evm) throw new Error('useValenceEvmConfig must be used within a ValenceDomainClientsProvider');
    return config.evm;
  }
  