import { useValenceDomainConfig } from "@/common";

export function useValenceCosmosConfig() {
    const config = useValenceDomainConfig();
    if (!config.cosmos) throw new Error('useValenceCosmosConfig must be used within a ValenceDomainClientsProvider');
    return config.cosmos;
  }
  