'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { Address } from 'viem';
import { useEvmClient } from '@valence-protocol/domain-clients-react';

interface EthereumReadProps {
  initialAddress: Address;
  symbol: string;
  erc20Address: Address;
  initialBalance: bigint;
  decimals: number;
  chainId: number;
}

export const EthereumRead = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  erc20Address,
  chainId,
}: EthereumReadProps) => {
  const [inputAddress, setInputAddress] = useState<Address>(initialAddress);
  const { client: evmClient } = useEvmClient(chainId);

  const queryBalance = useCallback(async () => {
    if (!evmClient) {
      throw new Error('EVM client not found');
    }
    const balance = await evmClient.getErc20Balance({
      erc20Address,
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
    <div className='flex flex-col gap-2 w-1/2 max-w-md'>
      <h2 className='font-semibold'>Ethereum Read</h2>
      <BalanceView
        inputAddress={inputAddress}
        setInputAddress={(address: string) =>
          setInputAddress(address as Address)
        }
        isLoading={isLoading}
        isError={isError}
        decimals={decimals}
        symbol={symbol}
        amount={balance?.balance.toString()}
      />
    </div>
  );
};
