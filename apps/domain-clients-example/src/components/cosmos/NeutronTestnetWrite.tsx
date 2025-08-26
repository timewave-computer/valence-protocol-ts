'use client';

import { Button, Input, Label } from '@/components/ui';
import { useCallback, useState } from 'react';
import { useSigningCosmosClient } from '@valence-protocol/domain-clients-react/cosmos';
import { useMutation } from '@tanstack/react-query';
import { baseToMicro } from '@valence-protocol/domain-clients-core';
import { useIsCosmosChainConnected } from '@valence-protocol/domain-modal-react';

type NeutronTestnetWriteProps = {
  chainId: string;
  decimals: number;
  denom: string;
};

export const NeutronTestnetWrite = ({
  chainId,
  decimals,
  denom,
}: NeutronTestnetWriteProps) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const isConnected = useIsCosmosChainConnected({ chainId });

  const signingCosmosClient = useSigningCosmosClient({ chainId });

  const onSubmit = useCallback(async () => {
    if (!signingCosmosClient) {
      throw new Error('Cosmos signing client not found');
    }

    const amountInBase = baseToMicro(amount, decimals);

    const tx = await signingCosmosClient.sendTokens({
      recipient: toAddress,
      amount: [
        {
          amount: amountInBase.toString(),
          denom,
        },
      ],
    });
    return tx;
  }, [decimals, denom, amount, toAddress, signingCosmosClient]);

  const {
    mutate: sendTokens,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: onSubmit,
    onError: error => {
      console.error('Transaction failed', error);
    },
  });

  return (
    <div className='flex flex-col gap-2 w-1/2 max-w-md'>
      <h2 className='font-semibold text-sm'>Neutron Testnet</h2>
      <div className='flex flex-col'>
        <Label htmlFor='amount'>Amount NTRN</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter amount'
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='toAddress'>Recipient Address</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter address'
          type='text'
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <Button disabled={!isConnected} onClick={() => sendTokens()}>
          <span>Transfer</span>
        </Button>
      </div>
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
  );
};
