import { Suspense } from 'react';
import { Header, ConfigDisplay, NeutronData } from '@/components';
import { getCosmosBalance, getEthErc20Balance } from '@/server';
import { type Address } from 'viem';
import { EthereumData } from '@/components/EthereumData';

const neutronAsset = {
  denom: 'untrn',
  chainId: 'neutron-1',
  symbol: 'NTRN',
  userAddress: 'neutron1fl48vsnmsdzcv85q5d2q4z5ajdha8yu33yqdrs',
};

const usdcAsset = {
  userAddress: '0x70801f4fd5daf2a5dc64167386ad7b1e91e993c0' as Address,
  tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as Address,
  symbol: 'USDC',
  chainId: 1,
};

export default async function Home() {
  const cosmosBalance = await getCosmosBalance({
    address: neutronAsset.userAddress,
    denom: neutronAsset.denom,
    chainId: neutronAsset.chainId,
  });

  const usdcBalance = await getEthErc20Balance({
    address: usdcAsset.userAddress,
    erc20Address: usdcAsset.tokenAddress,
    chainId: usdcAsset.chainId,
  });

  return (
    <>
      <Header />
      <main className='grow p-4 flex flex-col gap-4'>
        <p>
          This app is a simple example of how to use the Valence Domain Modal
          and Domain Clients API.
        </p>

        <ConfigDisplay />

        <Suspense fallback={<div>Loading...</div>}>
          <div className='flex flex-row gap-4'>
            <NeutronData
              denom={neutronAsset.denom}
              chainId={neutronAsset.chainId}
              initialBalance={cosmosBalance.amount}
              decimals={cosmosBalance.decimals}
              initialAddress={neutronAsset.userAddress}
              symbol={neutronAsset.symbol}
            />
            <EthereumData
              chainId={usdcAsset.chainId}
              erc20Address={usdcAsset.tokenAddress}
              initialBalance={usdcBalance.balance}
              decimals={usdcBalance.decimals}
              initialAddress={usdcAsset.userAddress}
              symbol={usdcAsset.symbol}
            />
          </div>
        </Suspense>
      </main>
    </>
  );
}
