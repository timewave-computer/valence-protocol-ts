'use client';
import { useMemo } from 'react';
import { useEvmConfig } from '@/evm';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';

export function useEvmClient({ chainId }: { chainId: number }): EvmClient {
  const config = useEvmConfig();

  return useMemo(() => {
    const client = new EvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
    });
    return client;
  }, [chainId, config.wagmiConfig]);
}
