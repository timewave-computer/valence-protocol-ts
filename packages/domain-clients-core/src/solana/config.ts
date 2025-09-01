import {
  type SolanaConfig,
  type SolanaCluster,
  isSolanaClusterId,
} from '@/solana';

export const createSolanaDomainClientsConfig = ({
  clusters,
  defaultClusterId,
}: {
  clusters: SolanaCluster[];
  defaultClusterId: string;
}): SolanaConfig => {
  if (!isSolanaClusterId(defaultClusterId)) {
    throw new Error('Default cluster id must start with "solana:"');
  }

  // convert to format for wallet-ui (side-stepping 'moniker' feature)
  const convertedClusters = clusters.map(cluster => {
    return {
      id: cluster.id,
      label: cluster.label,
      cluster: cluster.cluster,
      urlOrMoniker: cluster.url,
    };
  });

  return {
    clusters: convertedClusters,
    defaultClusterId: defaultClusterId,
  };
};
