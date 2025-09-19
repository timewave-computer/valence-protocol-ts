'use client';

import { SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletUiCluster } from '@wallet-ui/react';

export const useIsSolanaChainConnected = (args?: {
  clusterId?: SolanaClusterId;
}) => {
  const { connected } = useWallet();
  // TODO: this needs to be replaced
  const { cluster } = useWalletUiCluster();
  if (!connected) return false;
  if (!args?.clusterId) return connected;

  const clusterId = args?.clusterId;
  return cluster?.id === clusterId;
};
