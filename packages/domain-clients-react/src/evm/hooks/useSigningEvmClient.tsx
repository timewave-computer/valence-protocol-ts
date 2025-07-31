import {  useEffect, useMemo } from 'react';
import {  useEvmConfig, useEvmSigningClientStore } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

export function useSigningEvmClient(chainId: string) {
  const config = useEvmConfig();
  const account = useAccount();
  const {disconnect} = useDisconnect();
  const { data: walletClient } = useWalletClient();

  const {client, setClient} = useEvmSigningClientStore();


  useEffect(() => {
    if (!account || !walletClient) return;
    const client = new SigningEvmClient( config, walletClient);
    setClient(client);

  }, [account, walletClient, chainId, config]);


  // Memoize to prevent unnecessary re-renders
  return useMemo(() => ({
    client,
    account,
    disconnect,
  }), [client, account, disconnect]);

} 