'use client';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  SolanaClusterId,
  baseToMicro,
} from '@valence-protocol/domain-clients-core';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react/solana';
import { useIsSolanaChainConnected } from '@valence-protocol/domain-modal-react';
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
  const isConnected = useIsSolanaChainConnected({ clusterId });

  const signingSolanaClient = useSigningSolanaClient({ clusterId });

  const sendTokens = useCallback(async () => {
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

  const {
    mutate: onSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: sendTokens,
    onError: (error: Error) => {
      console.error('Transaction failed', error);
    },
  });

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
        <Button disabled={!isConnected} onClick={() => onSubmit()}>
          Submit
        </Button>
        {!isConnected && (
          <p className='text-xs text-gray-500'>
            Connect to Mainnet to transfer tokens
          </p>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {isError && (
          <div className='text-xs text-red-500'>Transaction failed</div>
        )}
        {isPending && (
          <div className='text-xs text-gray-500'>Transaction pending</div>
        )}
        {isSuccess && (
          <div className='text-xs text-green-500'>Transaction successful</div>
        )}
      </div>
    </>
  );
};
