import { useDomainConfig } from "@/common";

export function useCosmosConfig() {
    const config = useDomainConfig();
    if (!config.cosmos) throw new Error('useValenceCosmosConfig must be used within a ValenceDomainClientsProvider');
    return config.cosmos;
  }
  