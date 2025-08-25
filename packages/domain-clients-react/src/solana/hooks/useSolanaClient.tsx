'use client';

import {
  SolanaClient,
  SolanaClusterMoniker,
} from '@valence-protocol/domain-clients-core/solana';
import { useSolanaConfig } from '@/solana/hooks';
import { useMemo } from 'react';

export function useSolanaClient(
  clusterMoniker: SolanaClusterMoniker
): SolanaClient {
  const config = useSolanaConfig();

  const client = useMemo(() => {
    const cluster = config.clusters.find(
      cluster => cluster.cluster === clusterMoniker
    );
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterMoniker} not found in config`);
    }
    return new SolanaClient({
      rpcUrlOrMoniker: cluster.urlOrMoniker,
    });
  }, [config, clusterMoniker]);
  return client;
}
