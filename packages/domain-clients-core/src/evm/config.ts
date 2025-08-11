import { createConfig, type Config } from '@wagmi/core';

// Explicitly type the function to preserve generic type parameters
export const createEvmConfig: typeof createConfig = createConfig;
export type EvmConfig = Config;
