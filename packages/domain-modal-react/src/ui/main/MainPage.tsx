'use client';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ModalPage } from '@/ui/main';
import { ConnectCosmosButton, CosmosConnection } from '@/ui/cosmos';
import { ConnectEthereumButton, EvmConnection } from '@/ui/evm';
import { ConnectSolanaButton, SolanaConnection } from '@/ui/solana';

export const MainPage = ({
  onSelect,
}: {
  onSelect: (page: ModalPage) => void;
}) => {
  const config = useDomainConfig();

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-bold pb-2'>Select a Wallet</p>
      {/* Connected Wallets */}
      <div className='flex flex-col gap-2'>
        {config.evm && !config.evm.hide && <EvmConnection />}
        {config.solana && !config.solana.hide && <SolanaConnection />}
        {config.cosmos && !config.cosmos.hide && <CosmosConnection />}

        {/* Connect Wallet Buttons */}
        <div className='flex flex-col gap-2'>
          {config.evm && !config.evm.hide && (
            <ConnectEthereumButton onClick={() => onSelect(ModalPage.EVM)} />
          )}
          {config.solana && !config.solana.hide && (
            <ConnectSolanaButton onClick={() => onSelect(ModalPage.SOLANA)} />
          )}
          {config.cosmos && !config.cosmos.hide && (
            <ConnectCosmosButton onClick={() => onSelect(ModalPage.COSMOS)} />
          )}
        </div>
      </div>
    </div>
  );
};
