import { ChainType } from '@/hooks';

export type TargetChains = {
  [ChainType.Cosmos]?: string;
  [ChainType.Evm]?: number;
  [ChainType.Solana]?: string;
};

export const getCosmosTargetChain = (targetChains?: TargetChains) => {
  return targetChains?.[ChainType.Cosmos];
};

export const getEvmTargetChain = (targetChains?: TargetChains) => {
  return targetChains?.[ChainType.Evm];
};

export const getSolanaTargetRpcUrlOrMoniker = (targetChains?: TargetChains) => {
  return targetChains?.[ChainType.Solana];
};

export interface DomainModalContextType {
  showModal: (chain?: TargetChains) => void;
  closeModal: () => void;
  targetChains?: TargetChains;
  isModalOpen: boolean;
}
