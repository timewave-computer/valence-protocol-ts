import { useEffect, useMemo } from 'react';
import { useEvmClientStore, useEvmConfig } from '@/evm';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, usePublicClient } from 'wagmi';

export function useEvmClient() {
  const config = useEvmConfig();
  const account = useAccount();
  const publicClient  = usePublicClient();

  const {client, setClient} = useEvmClientStore();

  useEffect(() => {
    if (!account || !publicClient) return;
    const client = new EvmClient(config);
    setClient(client);

  }, [account, publicClient, config, setClient]);

  return useMemo(() => ({
    client,
    account,
  }), [client, account]);

} 