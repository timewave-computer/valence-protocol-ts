import { useState, useEffect } from 'react';
import { useValenceDomainConfig } from '@/context';
import { SigningCosmosClient } from '@valence-protocol/valence-domain-clients-core/cosmos';
// import { useAccount as useCosmosAccount, useOfflineSigner, connect, disconnect } from 'graz';


export function useSigningCosmosClient(chainId: string) {
  const config = useValenceDomainConfig(chainId);
  // TODO: Replace with actual graz hooks
  const account = undefined; // const { data: account } = useCosmosAccount();
  const signer = undefined; // const { data: signer } = useOfflineSigner();

  // TODO: needs better state mgmt
  const [client, setClient] = useState<SigningCosmosClient | null>(null);

  useEffect(() => {
    if (!account) return;
    // setClient(new SigningCosmosClient({
    //   config,
    //   chainId,
    //   // signer, // pass signer if needed
    // }));
  }, [config, account, chainId]);

  // TODO: memoize return value
  return {
    client,
    account,
    signer,
    // connect,
    // disconnect,
  };
} 