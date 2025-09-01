'use client';

import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import {
  ModalPage,
  EthereumMainSection,
  CosmosMainSection,
  SolanaMainSection,
} from '@/ui/main';

export const MainPage = ({
  onSelect,
}: {
  onSelect: (page: ModalPage) => void;
}) => {
  const config = useDomainConfig();

  return (
    <div className='flex flex-col gap-4'>
      <p>Select a wallet</p>

      {config.evm && (
        <EthereumMainSection
          onClick={() => {
            onSelect(ModalPage.EVM);
          }}
        />
      )}
      {config.cosmos && (
        <CosmosMainSection
          onClick={() => {
            onSelect(ModalPage.COSMOS);
          }}
        />
      )}
      {config.solana && (
        <SolanaMainSection
          onClick={() => {
            onSelect(ModalPage.SOLANA);
          }}
        />
      )}
    </div>
  );
};
