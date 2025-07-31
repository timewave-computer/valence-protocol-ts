import {  useEffect, useMemo } from 'react';
import {  useEvmConfig, useSigningEvmClientStore } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

export function useSigningEvmClient() {
  const config = useEvmConfig();
  const account = useAccount();
  const {disconnect} = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const {client, setClient} = useSigningEvmClientStore();

  useEffect(() => {
    if (!account || !walletClient) return;
    const client = new SigningEvmClient( config, walletClient);
    setClient(client);

  }, [account, walletClient, config]);

  return useMemo(() => ({
    client,
    account,
    disconnect,
  }), [client, account, disconnect]);

} 