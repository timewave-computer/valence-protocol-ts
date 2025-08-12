'use client';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { microToBase } from '@valence-protocol/domain-clients-core';
import { Label } from '@/components';
import { getCosmosBalance } from '@/server';

export const BalanceView = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  denom,
  chainId,
}: {
  initialBalance: string;
  decimals: number;
  initialAddress: string;
  symbol: string;
  denom: string;
  chainId: string;
}) => {
  const [inputAddress, setInputAddress] = useState(initialAddress);

  const queryBalance = useCallback(async () => {
    const balance = await getCosmosBalance({
      address: inputAddress,
      denom,
      chainId,
    });
    return balance;
  }, [inputAddress, denom, chainId]);

  const {
    data: balance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['balance', inputAddress, denom, chainId],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress,
    initialData: {
      amount: initialBalance,
      denom: denom,
      decimals: decimals,
    },
  });

  return (
    <div className='flex flex-col gap-2 w-1/2'>
      <h2 className='font-semibold'>Neutron</h2>

      <div className='flex flex-col'>
        <Label htmlFor='address'>Address</Label>
        <input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter address'
          type='text'
          value={inputAddress}
          onChange={e => setInputAddress(e.target.value)}
        />
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='balance'>Balance</Label>
        <p className='text-sm  font-mono'>
          {microToBase(balance?.amount, decimals)} {symbol}
        </p>
        {isLoading && <p className='text-xs'>Loading...</p>}
        {isError && <p className='text-xs text-red-500'>Error</p>}
      </div>
    </div>
  );
};
