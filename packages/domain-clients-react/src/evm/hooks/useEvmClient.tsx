import { useEffect, useMemo } from 'react';
import { useEvmClientStore, useEvmConfig } from '@/evm';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

export function useEvmClient() {
  const config = useEvmConfig();
  const account = useAccount();
  const {disconnect} = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const {client, setClient} = useEvmClientStore();

  useEffect(() => {
    if (!account || !walletClient) return;
    const client = new EvmClient(config);
    setClient(client);

  }, [account, walletClient, config]);

  return useMemo(() => ({
    client,
    account,
    disconnect,
  }), [client, account, disconnect]);

} 