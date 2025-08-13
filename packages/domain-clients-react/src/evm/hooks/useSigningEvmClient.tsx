'use client';
import { useEffect, useMemo } from 'react';
import { useEvmConfig, useSigningEvmClientStore } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';

export function useSigningEvmClient(chainId: number) {
  const config = useEvmConfig();
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient({ chainId });

  const client = useSigningEvmClientStore(s => s.clients[chainId]);
  const setClient = useSigningEvmClientStore(s => s.setClient);

  useEffect(() => {
    if (!account || !walletClient) return;
    const client = new SigningEvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
      signer: walletClient,
    });
    setClient(chainId, client);
  }, [account, walletClient, config.wagmiConfig, chainId, setClient]);

  return useMemo(
    () => ({
      client,
      account,
      disconnect,
    }),
    [client, account, disconnect]
  );
}
