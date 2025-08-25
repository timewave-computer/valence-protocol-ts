import type { SolanaCluster, SolanaUrlOrMoniker } from '@/solana';

export interface SolanaConfig {
  clusters: SolanaCluster[];
  defaultUrlOrMoniker: SolanaUrlOrMoniker;
}
