import {
  createSolanaDomainClientsConfig,
  type SolanaCluster,
} from '@valence-protocol/domain-clients-core/solana';

export const devnet: SolanaCluster = {
  id: 'solana:devnet',
  label: 'Devnet',
  cluster: 'devnet',
  url: 'https://api.devnet.solana.com',
};
export const mainnet: SolanaCluster = {
  id: 'solana:mainnet',
  label: 'Mainnet',
  cluster: 'mainnet',
  url: 'https://api.mainnet-beta.solana.com',
};

export const solanaConfig = createSolanaDomainClientsConfig({
  clusters: [devnet, mainnet],
  defaultClusterId: devnet.id,
});
