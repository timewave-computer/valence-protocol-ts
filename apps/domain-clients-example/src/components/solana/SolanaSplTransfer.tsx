'use client';
import { useState } from 'react';
import { SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react';
import { useIsSolanaConnected } from '@valence-protocol/domain-modal-react';

export const SolanaSplTransfer = ({
  clusterId,
}: {
  clusterId: SolanaClusterId;
}) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const isConnected = useIsSolanaConnected({ clusterId });

  const signingSolanaClient = useSigningSolanaClient({ clusterId });

  return <div>SolanaSplTransfer</div>;
};
