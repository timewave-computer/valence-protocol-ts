'use client';
import { useCallback, useState } from 'react';
import {
  SolanaClusterId,
  baseToMicro,
} from '@valence-protocol/domain-clients-core';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react/solana';
import { useIsSolanaConnected } from '@valence-protocol/domain-modal-react';
import { type Address, address } from 'gill';
import { Input, Label, Button } from '@/components';

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

  return (
    <>
      <div className='flex flex-col'>
        <Label htmlFor='toAddress'>To Address</Label>
        <Input
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
          type='text'
          placeholder='Enter to address'
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='amount'>Amount</Label>
        <Input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type='number'
          placeholder='Enter amount'
        />
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <Button disabled={!isConnected} onClick={onSubmit}>
          Submit
        </Button>
        {!isConnected && (
          <p className='text-xs text-gray-500'>
            Connect to Solana to transfer tokens
          </p>
        )}
      </div>
    </>
  );
};
