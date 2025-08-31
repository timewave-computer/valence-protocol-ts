'use client';
import { SolanaClusterId } from '@wallet-ui/react';
import { useCallback } from 'react';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react/solana';

export const RaydiumSwap = ({ clusterId }: { clusterId: SolanaClusterId }) => {
  const signingSolanaClient = useSigningSolanaClient({ clusterId });

  const onSubmit = useCallback(async () => {
    console.log('onSubmit');
  }, []);

  return <div>Raydium Swap</div>;
};
