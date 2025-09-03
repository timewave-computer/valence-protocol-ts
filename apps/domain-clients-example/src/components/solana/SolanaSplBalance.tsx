'use client';
import { useCallback, useEffect, useState } from 'react';
import { BalanceView } from '@/components';
import { StringifiedBigInt, type Address } from 'gill';
import { useSolanaClient } from '@valence-protocol/domain-clients-react/solana';
import { type SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';
import { useQuery } from '@tanstack/react-query';

export const SolanaSplBalance = ({
  initialAddress,
  decimals,
  symbol,
  initialBalance,
  clusterId,
  tokenMintAddress,
}: {
  initialAddress: Address;
  initialBalance?: StringifiedBigInt;
  decimals: number;
  symbol: string;
  clusterId: SolanaClusterId;
  tokenMintAddress: Address;
}) => {
  const [inputAddress, setInputAddress] = useState<Address>(initialAddress);
  const solanaClient = useSolanaClient({ clusterId });

  const queryBalance = useCallback(async () => {
    if (!solanaClient) {
      throw new Error('Solana client not found');
    }
    const balance = await solanaClient.queryTokenBalance({
      tokenMintAddress: tokenMintAddress,
      userAddress: inputAddress,
    });
    return balance;
  }, [inputAddress, tokenMintAddress, solanaClient, decimals]);

  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['sol-spl-balance', inputAddress, tokenMintAddress, clusterId],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress && !!solanaClient,
    retry: false,
    staleTime: 0,
    initialData: initialBalance,
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching Solana balance', error);
    }
  }, [error]);

  return (
    <BalanceView
      inputAddress={inputAddress}
      setInputAddress={(address: string) => setInputAddress(address as Address)}
      isLoading={isLoading}
      isError={isError}
      decimals={decimals}
      symbol={symbol}
      amount={balance ?? '0'}
    />
  );
};
