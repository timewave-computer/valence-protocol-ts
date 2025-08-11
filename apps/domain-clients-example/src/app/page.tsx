'use client';
import { Header, ConfigDisplay } from '@/components';
import {
  useEvmConnectors,
  useCosmosConnectors,
} from '@valence-protocol/domain-modal-react';

export default function Home() {
  const evmConnectors = useEvmConnectors();
  const cosmosConnectors = useCosmosConnectors();
  console.log('cosmosConnectors', cosmosConnectors);
  console.log('evmConnectors', evmConnectors);

  return (
    <>
      <Header />
      <main className='grow p-4 flex flex-col gap-4'>
        <p>
          This app is a simple example of how to use the Valence Domain Modal
          and Domain Clients API.
        </p>
        <div>
          <ConfigDisplay />
        </div>
      </main>
    </>
  );
}
