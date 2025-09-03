'use server';

import { domainClientsConfig } from '@/config/domainClientsConfig';
import { StringifiedBigInt, type Address } from 'gill';
import {
  SolanaClient,
  SolanaClusterId,
} from '@valence-protocol/domain-clients-core/solana';

export const getSolanaSplBalance = async ({
  address,
  mintAddress,
  clusterId,
}: {
  address: Address;
  mintAddress: Address;
  clusterId: SolanaClusterId;
}): Promise<StringifiedBigInt> => {
  const config = domainClientsConfig.solana;
  if (!config) {
    throw new Error('Solana config not found');
  }
  const cluster = config.clusters.find(cluster => cluster.id === clusterId);
  if (!cluster) {
    throw new Error(`Cluster ${clusterId} not found in config`);
  }
  const solanaClient = new SolanaClient({
    rpcUrl: cluster.urlOrMoniker,
  });

  const balance = await solanaClient.queryTokenBalance({
    tokenMintAddress: mintAddress,
    userAddress: address,
  });

  return balance;
};
