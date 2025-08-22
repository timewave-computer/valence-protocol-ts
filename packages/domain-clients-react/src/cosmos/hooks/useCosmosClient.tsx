'use client';
import { useMemo } from 'react';
import { useCosmosChainConfig } from '@/cosmos';
import { CosmosClient } from '@valence-protocol/domain-clients-core/cosmos';

export function useCosmosClient(chainId: string): CosmosClient {
  const config = useCosmosChainConfig(chainId);

  return useMemo(() => {
    const client = new CosmosClient({
      chainId,
      rpcUrl: config.rpc,
    });
    return client;
  }, [config.rpc, chainId]);
}
