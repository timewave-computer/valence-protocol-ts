'use client';
import { EvmConnectors } from '@/ui/evm';
import { CosmosConnectionManager } from '@/ui/cosmos';
import { SolanaConnectionManager } from '@/ui/solana';
import {
  MainPage,
  DomainPageRoot,
  useModalNavigation,
  ModalPage,
} from '@/ui/main';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';

export const ModalContent = () => {
  const config = useDomainConfig();

  const configEntries = Object.entries(config)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => ({ domain: key, value }));

  const navigationStack = useModalNavigation();

  if (configEntries.length === 0) {
    throw new Error(
      'At least one domain must be configured in the domain clients config.'
    );
  }

  if (Object.keys(config).length === 1) {
    return <div>todo</div>;
  }

  switch (navigationStack.current) {
    case ModalPage.MAIN:
      return <MainPage onSelect={navigationStack.push} />;
    case ModalPage.SOLANA:
      return <div>Solana</div>;
    case ModalPage.COSMOS:
      return <div>Cosmos</div>;
    case ModalPage.EVM:
      return (
        <DomainPageRoot
          title='Ethereum Wallet'
          onBack={() => navigationStack.pop()}
        >
          <EvmConnectors />
        </DomainPageRoot>
      );
    default:
      throw new Error(`Unknown domain: ${navigationStack.current}`);
  }
};
