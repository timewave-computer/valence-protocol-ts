'use client';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BalanceView } from '@/components';
import { getEthErc20Balance } from '@/server';
import { Address } from 'viem';

interface EthereumDataProps {
  initialAddress: Address;
  symbol: string;
  erc20Address: Address;
  tokenAddress: Address;
  initialBalance: bigint;
  decimals: number;
}

export const EthereumData = ({
  initialBalance,
  decimals,
  initialAddress,
  symbol,
  erc20Address,
}: EthereumDataProps) => {
  const [inputAddress, setInputAddress] = useState<Address>(initialAddress);

  const queryBalance = useCallback(async () => {
    const balance = await getEthErc20Balance({
      address: inputAddress,
      erc20Address: erc20Address,
    });
    return balance;
  }, [inputAddress, erc20Address]);

  const {
    data: balance,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['eth-balance', inputAddress, erc20Address],
    queryFn: () => queryBalance(),
    enabled: !!inputAddress,
    retry: false,
    staleTime: 0,
    initialData: {
      balance: initialBalance,
      decimals: decimals,
    },
  });

  return (
    <div className='flex flex-col gap-2 w-1/2'>
      <h2 className='font-semibold'>Neutron</h2>
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
