'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { useCosmosClient } from '@valence-protocol/domain-clients-react/cosmos';

interface CosmosDenomBalanceProps {
  initialBalance: string;
  decimals: number;
  initialAddress: string;
  symbol: string;
  denom: string;
  chainId: string;
}

export const CosmosDenomBalance = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  denom,
  chainId,
}: CosmosDenomBalanceProps) => {
  const [inputAddress, setInputAddress] = useState(initialAddress);

  const cosmosClient = useCosmosClient({ chainId });

  const queryBalance = useCallback(async () => {
    if (!cosmosClient) {
      throw new Error('Cosmos client not found');
    }
    const balance = await cosmosClient.queryDenomBalance({
      address: inputAddress,
      denom,
    });
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
    queryKey: ['cosmos-balance', inputAddress, denom, chainId],
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
      console.error(`Error fetching ${denom} balance on ${chainId}`, error);
    }
  }, [error]);

  return (
    <BalanceView
      inputAddress={inputAddress}
      setInputAddress={setInputAddress}
      isLoading={isLoading}
      isError={isError}
      decimals={decimals}
      symbol={symbol}
      amount={balance?.amount}
    />
  );
};
