import { useSolanaConfig } from '@/solana/hooks';
import { SigningSolanaClient } from '@valence-protocol/domain-clients-core/solana';
import { useMemo } from 'react';
import { SolanaClusterId, useWalletUiSigner } from '@wallet-ui/react';

export const useSigningSolanaClient = ({
  clusterId,
}: {
  clusterId: SolanaClusterId;
}): SigningSolanaClient | undefined => {
  const config = useSolanaConfig();
  const signer = useWalletUiSigner();

  const signingClient = useMemo(() => {
    if (!signer) {
      return;
    }
    const cluster = config.clusters.find(cluster => cluster.id === clusterId);
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterId} not found in config`);
    }
    const rpcUrlOrMoniker = cluster.urlOrMoniker;

    return new SigningSolanaClient({
      rpcUrlOrMoniker,
      signer,
    });
  }, [config, clusterId, signer]);

  return signingClient;
};
