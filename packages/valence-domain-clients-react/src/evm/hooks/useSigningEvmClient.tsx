import { useState, useEffect, useMemo } from 'react';
import {  useValenceEvmConfig } from '@/evm';
import { SigningEvmClient } from '@valence-protocol/valence-domain-clients-core/evm';
import { useAccount, useWalletClient } from 'wagmi';


export function useSigningEvmClient(chainId: string) {
  const config = useValenceEvmConfig();
  const account = useAccount({config});
  const { data: signer } = useWalletClient();

  // TODO: replace with zustand
  const [client, setClient] = useState<SigningEvmClient | null>(null);

  useEffect(() => {
    if (!account) return;
    // setClient(new SigningEvmClient({
    //   config,
    //   chainId,
    //   // signer, // pass signer if needed
    // }));
  }, [account, chainId, config]);

  // Memoize to prevent unnecessary re-renders
  return useMemo(() => ({
    client,
    account,
    signer,
    // connect,
    // disconnect,
  }), [client, account, signer]);

} 