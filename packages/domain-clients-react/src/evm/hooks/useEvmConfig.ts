'use client';
import { useDomainConfig } from '@/common';
import { EvmConfig } from '@valence-protocol/domain-clients-core/evm';

export function useEvmConfig(): EvmConfig {
  const config = useDomainConfig();
  if (!config.evm) throw new Error('Evm config is not set');
  return config.evm;
}
