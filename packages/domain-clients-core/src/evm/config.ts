import { createConfig, type Config } from '@wagmi/core';
import { DomainClientConfig } from '@/common';

// Explicitly type the function to preserve generic type parameters
export const createEvmConfig: typeof createConfig = createConfig;
export interface EvmConfig extends DomainClientConfig {
  wagmiConfig: Config;
  defaultChainId: number;
}
