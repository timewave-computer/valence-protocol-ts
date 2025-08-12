'use client';
import { useDomainConfig } from '@/common';
import {
  CosmosConfig,
  type CosmosChainConfig,
  CosmosChainInfo,
} from '@valence-protocol/domain-clients-core/cosmos';

export function useCosmosConfig(): CosmosConfig {
  const config = useDomainConfig();
  if (!config.cosmos)
    throw new Error(
      'useCosmosConfig must be used within a DomainClientsProvider'
    );
  return config.cosmos;
}

export function useCosmosChainConfig(chainId: string): CosmosChainInfo {
  const config = useCosmosConfig();
  const chainInfo = config.grazOptions.chains.find(
    chain => chain.chainId === chainId
  );
  if (!chainInfo) throw new Error(`Chain ${chainId} not found in config`);

  return chainInfo;
}

export function useCosmosSigningChainConfig(chainId: string): {
  chainInfo: CosmosChainInfo;
  chainConfig: CosmosChainConfig;
} {
  const config = useCosmosConfig();
  const chainInfo = config.grazOptions.chains.find(
    chain => chain.chainId === chainId
  );
  if (!chainInfo) throw new Error(`Chain ${chainId} not found in config`);
  const chainConfig = config.grazOptions.chainsConfig?.[chainInfo.chainId];
  if (!chainConfig) throw new Error(`Chain config not found for ${chainId}`);
  return {
    chainConfig,
    chainInfo,
  };
}

export function useCosmosSigningTypes() {
  const config = useCosmosConfig();
  return {
    protobufRegistry: config.protobufRegistry,
    aminoTypes: config.aminoTypes,
  };
}
