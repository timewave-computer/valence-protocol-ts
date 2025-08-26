'use client';
import { useMemo } from 'react';
import { useEvmConfig } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/domain-clients-core/evm';
import { useAccount, useWalletClient } from 'wagmi';

export function useSigningEvmClient(
  chainId: number
): SigningEvmClient | undefined {
  const config = useEvmConfig();
  const account = useAccount();
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo(() => {
    if (!account) {
      return;
    }
    if (!walletClient) {
      return;
    }
    return new SigningEvmClient({
      config: config.wagmiConfig,
      chainId: chainId,
      signer: walletClient,
    });
  }, [account, walletClient, config.wagmiConfig, chainId]);
}
