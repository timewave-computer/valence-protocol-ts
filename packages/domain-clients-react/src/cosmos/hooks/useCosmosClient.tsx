'use client';
import { useEffect, useMemo } from 'react';
import { useCosmosChainConfig, useCosmosClientStore } from '@/cosmos';
import { CosmosClient } from '@valence-protocol/domain-clients-core/cosmos';

export interface UseCosmosClientResult {
  client: CosmosClient | null;
}

export function useCosmosClient(chainId: string): UseCosmosClientResult {
  const config = useCosmosChainConfig(chainId);

  const { client, setClient } = useCosmosClientStore();

  useEffect(() => {
    setClient(
      new CosmosClient({
        chainId,
        rpcUrl: config.rpc,
      })
    );
  }, [config.rpc, chainId, setClient]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
