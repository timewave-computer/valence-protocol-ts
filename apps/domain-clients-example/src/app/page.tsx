import { Suspense } from 'react';
import {
  Header,
  ConfigView,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  EthereumOps,
  CosmosOps,
  SolanaOps,
} from '@/components';

export default async function Home() {
  return (
    <>
      <Header />
      <main className='grow p-4 flex flex-col gap-8 pb-10'>
        <p className='text-sm'>
          This app is a simple example of how to use the Valence Domain Modal
          and Domain Clients API.
        </p>

        <div className='flex flex-col '>
          <h2 className='font-semibold text-xl '>
            Domain Client Configuration
          </h2>
          <p className='text-sm pt-2 pb-4'>
            This is the configuration for the domain clients. It is used to
            determine which chains and wallets are available to the user.
          </p>

          <ConfigView />
        </div>
        <div>
          <h2 className='font-semibold text-xl pb-2  '>Domain Operations</h2>
          <Tabs className='md:max-w-[400px]' defaultValue='solana'>
            <TabsList>
              <TabsTrigger value='evm'>Ethereum</TabsTrigger>
              <TabsTrigger value='cosmos'>Cosmos</TabsTrigger>
              <TabsTrigger value='solana'>Solana</TabsTrigger>
            </TabsList>
            <TabsContent value='evm'>
              <Suspense fallback={<div>Loading...</div>}>
                <EthereumOps />
              </Suspense>
            </TabsContent>
            <TabsContent value='cosmos'>
              <Suspense fallback={<div>Loading...</div>}>
                <CosmosOps />
              </Suspense>
            </TabsContent>
            <TabsContent value='solana'>
              <Suspense fallback={<div>Loading...</div>}>
                <SolanaOps />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
