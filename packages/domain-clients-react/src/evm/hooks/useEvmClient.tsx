'use client';
import { useEffect, useMemo, useState } from 'react';
import { useEvmConfig } from '@/evm';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';

export function useEvmClient(chainId: number) {
  const config = useEvmConfig();

  const [client, setClient] = useState<EvmClient | undefined>(undefined);

  useEffect(() => {
    const client = new EvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
    });
    setClient(client);
  }, [chainId, config.wagmiConfig, setClient]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
