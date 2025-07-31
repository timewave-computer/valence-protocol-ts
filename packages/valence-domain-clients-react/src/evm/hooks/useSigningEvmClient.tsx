import { useState, useEffect, useMemo } from 'react';
import {  useValenceEvmConfig } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/valence-domain-clients-core/evm';
import { useAccount, useWalletClient } from 'wagmi';


export function useSigningEvmClient(chainId: string) {
  const config = useValenceEvmConfig();
  const account = useAccount({config});
  const { data: walletClient } = useWalletClient({config});

  // TODO: replace with zustand
  const [client, setClient] = useState<SigningEvmClient | null>(null);

  useEffect(() => {
    if (!account) return;
    setClient(new SigningEvmClient( config, walletClient));
  }, [account, chainId, config]);

  // Memoize to prevent unnecessary re-renders
  return useMemo(() => ({
    client,
    account,
    walletClient,
    // connect,
    // disconnect,
  }), [client, account, walletClient]);

} 