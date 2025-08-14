'use client';
import { useEffect, useMemo, useState } from 'react';
import { useEvmConfig } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useWalletClient } from 'wagmi';

export function useSigningEvmClient(chainId: number) {
  const config = useEvmConfig();
  const account = useAccount();
  const { data: walletClient } = useWalletClient({ chainId });

  const [client, setClient] = useState<SigningEvmClient | undefined>(undefined);

  useEffect(() => {
    if (!account || !walletClient) {
      setClient(undefined);
      return;
    }
    const client = new SigningEvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
      signer: walletClient,
    });
    setClient(client);
  }, [account, walletClient, config.wagmiConfig, chainId]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
