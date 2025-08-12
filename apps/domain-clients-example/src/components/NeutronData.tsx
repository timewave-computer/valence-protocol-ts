'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { useCosmosClient } from '@valence-protocol/domain-clients-react';

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

  const { client: cosmosClient } = useCosmosClient(chainId);

  const queryBalance = useCallback(async () => {
    if (!cosmosClient) {
      throw new Error('Cosmos client not found');
    }
    const balance = await cosmosClient.getDenomBalance(inputAddress, denom);
    return {
      amount: balance.amount,
      denom: balance.denom,
      decimals: decimals,
    };
  }, [inputAddress, denom, cosmosClient, decimals]);

  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['neutron-balance', inputAddress, denom, chainId],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress && !!cosmosClient,
    retry: false,
    staleTime: 0,
    initialData: {
      amount: initialBalance,
      denom: denom,
      decimals: decimals,
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching Neutron balance', error);
    }
  }, [error]);

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
