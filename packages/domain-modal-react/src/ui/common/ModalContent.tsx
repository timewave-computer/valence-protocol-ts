'use client';
import { EvmConnectionManager } from '@/ui/evm';
import { CosmosConnectionManager } from '@/ui/cosmos';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';

export const ModalContent = () => {
  const config = useDomainConfig();

  return (
    <div className='flex flex-col gap-4 py-2 px-4'>
      <h1 className='text-xl font-semibold'>Select a wallet</h1>
      {config.evm && (
        <div>
          <h2 className='text-base font-semibold mb-0.5'>Ethereum Wallet</h2>
          <EvmConnectionManager />
        </div>
      )}
      {config.cosmos && (
        <div>
          <h2 className='text-base font-semibold mb-0.5'>Cosmos Wallet</h2>
          <CosmosConnectionManager />
        </div>
      )}
    </div>
  );
};
