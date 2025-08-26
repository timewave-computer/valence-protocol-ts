import { ChainType } from '@/hooks';
import { SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';

export type TargetChains = {
  [ChainType.Cosmos]?: string; // chain id
  [ChainType.Evm]?: number; // chain id
  [ChainType.Solana]?: SolanaClusterId; // cluster id
};

export const getCosmosTargetChain = (
  targetChains?: TargetChains
): string | undefined => {
  return targetChains?.[ChainType.Cosmos];
};

export const getEvmTargetChain = (
  targetChains?: TargetChains
): number | undefined => {
  return targetChains?.[ChainType.Evm];
};

export const getSolanaTargetCluster = (
  targetChains?: TargetChains
): SolanaClusterId | undefined => {
  return targetChains?.[ChainType.Solana];
};

export interface DomainModalContextType {
  showModal: (chain?: TargetChains) => void;
  closeModal: () => void;
  targetChains?: TargetChains;
  isModalOpen: boolean;
}
