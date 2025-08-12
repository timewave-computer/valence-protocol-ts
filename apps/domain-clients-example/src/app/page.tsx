import { Suspense } from 'react';
import { Header, ConfigDisplay, BalanceView } from '@/components';
import { getCosmosBalance } from '@/server';

const initialNeutronAddress = 'neutron1fl48vsnmsdzcv85q5d2q4z5ajdha8yu33yqdrs';

export default async function Home() {
  const cosmosBalance = await getCosmosBalance({
    address: initialNeutronAddress,
    denom: 'untrn',
    chainId: 'neutron-1',
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
          <BalanceView
            balance={cosmosBalance.amount}
            decimals={cosmosBalance.decimals}
            address={initialNeutronAddress}
            symbol={'NTRN'}
          />
        </Suspense>
      </main>
    </>
  );
}
