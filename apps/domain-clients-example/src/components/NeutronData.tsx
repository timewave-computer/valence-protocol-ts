'use client';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { getCosmosBalance } from '@/server';

interface NeutronDataProps {
  initialBalance: string;
  decimals: number;
  initialAddress: string;
  symbol: string;
  denom: string;
  chainId: string;
}

export const NeutronData = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  denom,
  chainId,
}: NeutronDataProps) => {
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
    queryKey: ['neutron-balance', inputAddress, denom, chainId],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress,
    retry: false,
    staleTime: 0,
    initialData: {
      amount: initialBalance,
      denom: denom,
      decimals: decimals,
    },
  });

  return (
    <div className='flex flex-col gap-2 w-1/2'>
      <h2 className='font-semibold'>Neutron</h2>
      <BalanceView
        inputAddress={inputAddress}
        setInputAddress={setInputAddress}
        isLoading={isLoading}
        isError={isError}
        decimals={decimals}
        symbol={symbol}
        amount={balance?.amount}
      />
    </div>
  );
};
