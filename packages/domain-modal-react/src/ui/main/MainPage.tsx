'use client';

import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ModalPage } from '@/ui/main';
import { EthereumMainPageSection } from './EthereumMainPageSection';

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
        <EthereumMainPageSection
          onClick={() => {
            onSelect(ModalPage.EVM);
          }}
        />
      )}
    </div>
  );
};
