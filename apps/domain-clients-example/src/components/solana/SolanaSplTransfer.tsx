'use client';
import { useCallback, useState } from 'react';
import {
  SolanaClusterId,
  baseToMicro,
} from '@valence-protocol/domain-clients-core';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react/solana';
import { useIsSolanaConnected } from '@valence-protocol/domain-modal-react';
import { type Address, address } from 'gill';

export const SolanaSplTransfer = ({
  clusterId,
  token,
}: {
  clusterId: SolanaClusterId;
  token: {
    mintAddress: Address;
    decimals: number;
  };
}) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const isConnected = useIsSolanaConnected({ clusterId });

  const signingSolanaClient = useSigningSolanaClient({ clusterId });

  const onSubmit = useCallback(async () => {
    if (!signingSolanaClient) {
      throw new Error('Solana client not found');
    }

    const convertedToAddress = address(toAddress);
    const convertedAmount = BigInt(baseToMicro(amount, token.decimals));

    const tx = await signingSolanaClient.transferToken({
      toAddress: convertedToAddress,
      amount: convertedAmount,
      tokenMintAddress: token.mintAddress,
    });
    return tx;
  }, [signingSolanaClient, toAddress, amount, token]);

  return <div>Solana SPL Transfer</div>;
};
