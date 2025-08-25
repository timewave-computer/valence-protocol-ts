'use client';

import { useSolanaConnectors } from '@/hooks/solana';
import { useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';

export const SolanaConnectionManager = () => {
  const solanaConnectors = useSolanaConnectors();
  const config = useSolanaConfig();
  const { targetChains } = useDomainModal();

  if (!config) {
    throw new Error(
      'Attempted to use SolanaConnectionManager with undefined solana config'
    );
  }
  return <div>Solana Connection Manager</div>;
};
