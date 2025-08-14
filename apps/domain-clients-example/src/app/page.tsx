import { Suspense } from 'react';
import {
  Header,
  ConfigView,
  NeutronRead,
  EthereumRead,
  EthereumTestnetWrite,
  NeutronTestnetWrite,
} from '@/components';
import { getCosmosBalance, getEthErc20Balance } from '@/server';
import { type Address } from 'viem';
import { neutrontestnet, neutron } from 'graz/chains';
import { mainnet, sepolia } from 'viem/chains';

const neutronNtrn = {
  chainId: neutron.chainId,
  symbol: 'NTRN',
  denom: 'untrn',
  decimals: 6, // hardcoded for brevity
};
const neutronUser = 'neutron1fl48vsnmsdzcv85q5d2q4z5ajdha8yu33yqdrs'; // Top holder

const evmUsdc = {
  chainId: mainnet.id,
  symbol: 'USDC',
  tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as Address,
};

const evmUser: Address = '0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c'; // AAVE protocol

export default async function Home() {
  const cosmosBalance = await getCosmosBalance({
    address: neutronUser,
    denom: neutronNtrn.denom,
    chainId: neutronNtrn.chainId,
  });

  const usdcBalance = await getEthErc20Balance({
    address: evmUser,
    erc20Address: evmUsdc.tokenAddress,
    chainId: evmUsdc.chainId,
  });

  return (
    <>
      <Header />
      <main className='grow p-4 flex flex-col gap-4'>
        <p>
          This app is a simple example of how to use the Valence Domain Modal
          and Domain Clients API.
        </p>

        <ConfigView />

        <Suspense fallback={<div>Loading...</div>}>
          <div className='flex flex-row gap-8'>
            <NeutronRead
              denom={neutronNtrn.denom}
              chainId={neutronNtrn.chainId}
              initialBalance={cosmosBalance.amount}
              decimals={cosmosBalance.decimals}
              initialAddress={neutronUser}
              symbol={neutronNtrn.symbol}
            />
            <EthereumRead
              chainId={evmUsdc.chainId}
              erc20Address={evmUsdc.tokenAddress}
              initialBalance={usdcBalance.balance}
              decimals={usdcBalance.decimals}
              initialAddress={evmUser}
              symbol={evmUsdc.symbol}
            />
          </div>
        </Suspense>
        <div className='flex flex-row gap-8'>
          <NeutronTestnetWrite
            denom={neutronNtrn.denom}
            decimals={neutronNtrn.decimals}
            chainId={neutrontestnet.chainId}
          />
          <EthereumTestnetWrite chainId={sepolia.id} />
        </div>
      </main>
    </>
  );
}
