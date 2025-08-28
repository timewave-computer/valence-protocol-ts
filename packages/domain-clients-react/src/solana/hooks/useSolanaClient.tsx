'use client';

import {
  SolanaClient,
  SolanaClusterId,
} from '@valence-protocol/domain-clients-core/solana';
import { useSolanaConfig } from '@/solana/hooks';
import { useMemo } from 'react';

export function useSolanaClient({
  clusterId,
}: {
  clusterId: SolanaClusterId;
}): SolanaClient {
  const config = useSolanaConfig();

  const client = useMemo(() => {
    const cluster = config.clusters.find(cluster => cluster.id === clusterId);
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterId} not found in config`);
    }
    const rpcUrlOrMoniker = cluster.urlOrMoniker;
    return new SolanaClient({
      rpcUrlOrMoniker,
    });
  }, [config, clusterId]);
  return client;
}
