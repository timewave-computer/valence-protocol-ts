'use client';
import { useEffect, useState, useMemo } from 'react';
import { useCosmosChainConfig } from '@/cosmos';
import { CosmosClient } from '@valence-protocol/domain-clients-core/cosmos';

export interface UseCosmosClientResult {
  client?: CosmosClient;
}

export function useCosmosClient(chainId: string): UseCosmosClientResult {
  const config = useCosmosChainConfig(chainId);

  const [client, setClient] = useState<CosmosClient | undefined>(undefined);

  useEffect(() => {
    const client = new CosmosClient({
      chainId,
      rpcUrl: config.rpc,
    });
    setClient(client);
  }, [config.rpc, chainId, setClient]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
