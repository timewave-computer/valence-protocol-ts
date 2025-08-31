import { type SolanaConfig } from '@valence-protocol/domain-clients-core/solana';
import { type SolanaCluster } from '@wallet-ui/react';

type SolanaClusterConfig = Pick<SolanaCluster, 'id' | 'label' | 'cluster'> & {
  url: string;
};

/**
 * Type guard to check if a string starts with "solana:"
 * @param value - The string to check
 * @returns True if the string starts with "solana:", false otherwise
 */
export function isSolanaClusterId(value: string): value is `solana:${string}` {
  return value.startsWith('solana:');
}

export const devnet: SolanaClusterConfig = {
  id: 'solana:devnet',
  label: 'Devnet',
  cluster: 'devnet',
  url: 'https://api.devnet.solana.com',
};
export const mainnet: SolanaClusterConfig = {
  id: 'solana:mainnet',
  label: 'Mainnet',
  cluster: 'mainnet',
  url: 'https://api.mainnet-beta.solana.com',
};

// TODO: move with core lib
export const createSolanaDomainClientsConfig = ({
  clusters,
  defaultClusterId,
}: {
  clusters: SolanaClusterConfig[];
  defaultClusterId: string;
}): SolanaConfig => {
  if (!isSolanaClusterId(defaultClusterId)) {
    throw new Error('Default cluster id must start with "solana:"');
  }

  const convertedClusters: SolanaCluster[] = clusters.map(cluster => {
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

export const solanaConfig = createSolanaDomainClientsConfig({
  clusters: [devnet, mainnet],
  defaultClusterId: devnet.id,
});
