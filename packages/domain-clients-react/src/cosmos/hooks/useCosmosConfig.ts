import { useDomainConfig } from "@/common";
import { ConfigureGrazArgs } from 'graz';

export type GrazConfig = ConfigureGrazArgs; // for better type inference

export function useCosmosConfig(): GrazConfig {
    const config = useDomainConfig();
    if (!config.cosmos) throw new Error('useCosmosConfig must be used within a DomainClientsProvider');
    return config.cosmos;
  }
  