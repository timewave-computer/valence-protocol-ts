'use client';
import { useSolanaConfig } from '@/solana/hooks';
import { SigningSolanaClient } from '@valence-protocol/domain-clients-core/solana';
import { useMemo } from 'react';
import { SolanaClusterId } from '@wallet-ui/react';
import { useWalletUiSigner } from '@wallet-ui/react';

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

    return new SigningSolanaClient({
      rpcUrl: cluster.urlOrMoniker,
      signer,
    });
  }, [config, clusterId, signer]);

  return signingClient;
};
