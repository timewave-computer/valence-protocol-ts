'use client';
import { useDomainConfig } from '@/common';
import { SolanaConfig } from '@valence-protocol/domain-clients-core/solana';

export function useSolanaConfig(): SolanaConfig {
  const config = useDomainConfig();
  if (!config.solana) throw new Error('Solana config is not set');
  return config.solana;
}
