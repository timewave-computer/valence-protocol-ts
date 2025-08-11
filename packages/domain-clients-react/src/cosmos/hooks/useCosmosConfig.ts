'use client';
import { useDomainConfig } from '@/common';
import { defineChainInfo, Dictionary } from 'graz';
import {
  CosmosGas,
  CosmosConfig,
} from '@valence-protocol/domain-clients-core/cosmos';

// reimplemented from graz because it's not exported
interface GrazChainConfig {
  path?: string;
  rpcHeaders?: Dictionary;
  gas?: CosmosGas;
}
type GrazChainInfo = ReturnType<typeof defineChainInfo>;

type CosmosChainConfig = {
  chainConfig: GrazChainConfig;
  chainInfo: GrazChainInfo;
};

export function useCosmosConfig(): CosmosConfig {
  const config = useDomainConfig();
  if (!config.cosmos)
    throw new Error(
      'useCosmosConfig must be used within a DomainClientsProvider'
    );
  return config.cosmos;
}

export function useCosmosChainConfig(chainId: string): CosmosChainConfig {
  const config = useCosmosConfig();
  const chainInfo = config.grazOptions.chains.find(
    chain => chain.chainId === chainId
  );
  if (!chainInfo) throw new Error(`Chain ${chainId} not found in config`);
  const chainConfig = config.grazOptions.chainsConfig?.[chainInfo.chainId];
  if (!chainConfig) throw new Error(`Chain ${chainId} not found in config`);
  return {
    chainConfig: chainConfig as GrazChainConfig,
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
