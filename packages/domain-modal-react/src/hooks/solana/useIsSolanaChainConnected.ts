'use client';

import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react';
import { SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';

export const useIsSolanaChainConnected = (args?: {
  clusterId?: SolanaClusterId;
}) => {
  const { connected } = useWalletUi();
  const { cluster } = useWalletUiCluster();
  if (!connected) return false;
  if (!args?.clusterId) return connected;

  const clusterId = args?.clusterId;
  return cluster?.id === clusterId;
};
