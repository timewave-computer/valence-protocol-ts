import { useSolanaConfig } from '@/solana/hooks';
import {
  SigningSolanaClient,
  SolanaClusterMoniker,
} from '@valence-protocol/domain-clients-core/solana';
import { useMemo } from 'react';
import { useWalletUiSigner } from '@wallet-ui/react';

export const useSolanaSigningClient = (
  clusterMoniker: SolanaClusterMoniker
): SigningSolanaClient | undefined => {
  const config = useSolanaConfig();
  const signer = useWalletUiSigner();

  const signingClient = useMemo(() => {
    const cluster = config.clusters.find(
      cluster => cluster.cluster === clusterMoniker
    );
    if (!cluster) {
      throw new Error(`Solana cluster ${clusterMoniker} not found in config`);
    }
    if (!signer) {
      console.warn('No signer found for solana');
      return;
    }

    return new SigningSolanaClient({
      rpcUrlOrMoniker: cluster.urlOrMoniker,
      signer,
    });
  }, [config, clusterMoniker, signer]);

  return signingClient;
};
