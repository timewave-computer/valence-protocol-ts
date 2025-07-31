import { useState, useEffect, useMemo } from 'react';
import { useCosmosConfig } from '@/cosmos';
import { SigningCosmosClient } from '@valence-protocol/domain-clients-core/cosmos';
// import { useAccount as useCosmosAccount, useOfflineSigner, connect, disconnect } from 'graz';


export function useSigningCosmosClient(chainId: string) {
  const config = useCosmosConfig();
  // TODO: Replace with actual graz hooks
  const account = undefined; // const { data: account } = useCosmosAccount();
  const signer = undefined; // const { data: signer } = useOfflineSigner();

  // TODO: replace with zustand
  const [client, setClient] = useState<SigningCosmosClient | null>(null);

  useEffect(() => {
    if (!account) return;
    // setClient(new SigningCosmosClient({
    //   config,
    //   chainId,
    //   // signer, // pass signer if needed
    // }));
  }, [config, account, chainId]);

  // Memoize to prevent unnecessary re-renders
  const result = useMemo(() => ({
    client,
    account,
    signer,
    // connect,
    // disconnect,
  }), [client, account, signer]);

  return result;
} 