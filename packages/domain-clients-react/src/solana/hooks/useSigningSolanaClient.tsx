'use client';
import { useSolanaConfig } from '@/solana/hooks';
import { SigningSolanaClient } from '@valence-protocol/domain-clients-core/solana';
import { useMemo } from 'react';
import { SolanaClusterId } from '@wallet-ui/react';

export const useSigningSolanaClient = ({
  clusterId,
}: {
  clusterId: SolanaClusterId;
}): SigningSolanaClient | undefined => {
  const config = useSolanaConfig();
  // TODO: this throws an error, 'chains' not defined
  // const signer = useWalletUiSigner();
  const signer = undefined;

  const signingClient = useMemo(() => {
    if (!signer) {
      return;
    }
    const cluster = config.clusters.find(cluster => cluster.id === clusterId);
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterId} not found in config`);
    }
    const rpcUrlOrMoniker = cluster.urlOrMoniker;

    console.log('signer', signer);
    console.log('config', config);
    console.log('clusterId', clusterId);
    console.log('cluster', cluster);
    console.log('rpcUrlOrMoniker', rpcUrlOrMoniker);

    return new SigningSolanaClient({
      rpcUrlOrMoniker,
      signer,
    });
  }, [config, clusterId, signer]);

  return signingClient;
};
