'use client';
import { useEffect, useMemo } from 'react';
import { useEvmClientStore, useEvmConfig } from '@/evm';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';

export function useEvmClient(chainId: number) {
  const config = useEvmConfig();

  const client = useEvmClientStore(s => s.clients[chainId]);
  const setClient = useEvmClientStore(s => s.setClient);

  useEffect(() => {
    const client = new EvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
    });
    setClient(chainId, client);
  }, [chainId, config.wagmiConfig, setClient]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
