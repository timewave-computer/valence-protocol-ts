import type { SolanaCluster, SolanaClusterId } from '@/solana';

export interface SolanaConfig {
  clusters: SolanaCluster[];
  defaultClusterId: SolanaClusterId;
}
