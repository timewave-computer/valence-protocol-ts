'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { Address } from 'viem';
import { useEvmClient } from '@valence-protocol/domain-clients-react/evm';

interface EthereumErc20BalanceProps {
  initialAddress: Address;
  symbol: string;
  erc20Address: Address;
  initialBalance?: bigint;
  decimals: number;
  chainId: number;
}

export const EthereumErc20Balance = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  erc20Address,
  chainId,
}: EthereumErc20BalanceProps) => {
  const [inputAddress, setInputAddress] = useState<Address>(initialAddress);
  const evmClient = useEvmClient({ chainId });

  const queryBalance = useCallback(async () => {
    if (!evmClient) {
      throw new Error('EVM client not found');
    }
    const balance = await evmClient.queryErc20Balance({
      contractAddress: erc20Address,
      address: inputAddress,
    });
    return {
      balance,
      decimals,
    };
  }, [inputAddress, erc20Address, evmClient, decimals]);

  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['eth-balance', inputAddress, erc20Address, chainId],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress && !!evmClient,
    retry: false,
    staleTime: 0,
    initialData: {
      balance: initialBalance,
      decimals: decimals,
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching Ethereum balance', error);
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
      amount={balance?.balance?.toString() ?? '0'}
    />
  );
};
