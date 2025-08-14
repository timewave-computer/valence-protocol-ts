'use client';
import { EvmConnectionManager } from '@/ui/evm';
import { CosmosConnectionManager } from '@/ui/cosmos';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';

export const ModalContent = () => {
  const config = useDomainConfig();

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>Select wallet</h1>
      {config.evm && (
        <div>
          <h2 className='text-lg font-bold'>EVM Wallet</h2>
          <EvmConnectionManager />
        </div>
      )}
      {config.cosmos && (
        <div>
          <h2 className='text-lg font-bold'>Cosmos Wallet</h2>
          <CosmosConnectionManager />
        </div>
      )}
    </div>
  );
};
