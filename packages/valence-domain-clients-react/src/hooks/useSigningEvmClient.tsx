import { useState, useEffect } from 'react';
import { useValenceDomainConfig } from '@/context';
import { SigningEvmClient } from '@valence-protocol/valence-domain-clients-core/evm';
// import { useAccount, useWalletClient } from 'wagmi';



export function useSigningEvmClient(chainId: string) {
  const config = useValenceDomainConfig(chainId);
  // TODO: Replace with actual wagmi hooks
  const account = undefined; // const { data: account } = useAccount();
  const signer = undefined; // const { data: signer } = useWalletClient();

  // TODO: needs better state mgmt
  const [client, setClient] = useState<SigningEvmClient | null>(null);

  useEffect(() => {
    if (!account) return;
    // setClient(new SigningEvmClient({
    //   config,
    //   chainId,
    //   // signer, // pass signer if needed
    // }));
  }, [account, chainId, config]);

  // TODO: memoize return value
  return {
    client,
    account,
    signer,
    // connect,
    // disconnect,
  };
} 