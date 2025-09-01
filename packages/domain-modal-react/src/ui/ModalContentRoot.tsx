'use client';
import { MainPage, useModalNavigation, ModalPage } from '@/ui/main';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ConnectCosmosPage } from '@/ui/cosmos';
import { ConnectEthereumPage } from '@/ui/evm';
import { ConnectSolanaPage } from '@/ui/solana';

export const ModalContentRoot = () => {
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

  return (
    <>
      {navigationStack.current === ModalPage.MAIN && (
        <MainPage onSelect={navigationStack.push} />
      )}
      {navigationStack.current === ModalPage.COSMOS && (
        <ConnectCosmosPage onBack={() => navigationStack.pop()} />
      )}
      {navigationStack.current === ModalPage.EVM && (
        <ConnectEthereumPage onBack={() => navigationStack.pop()} />
      )}
      {navigationStack.current === ModalPage.SOLANA && (
        <ConnectSolanaPage onBack={() => navigationStack.pop()} />
      )}
    </>
  );
};
