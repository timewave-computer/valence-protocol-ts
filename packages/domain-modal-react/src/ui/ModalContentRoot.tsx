'use client';
import { MainPage, useModalNavigation, ModalPage } from '@/ui/main';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ConnectCosmosPage } from '@/ui/cosmos';
import { ConnectEthereumPage } from '@/ui/evm';
import { ConnectSolanaPage } from '@/ui/solana';
import { motion } from 'framer-motion';

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
    if (config.solana) {
      return <ConnectSolanaPage />;
    }
    if (config.evm) {
      return <ConnectEthereumPage />;
    }
    if (config.cosmos) {
      return <ConnectCosmosPage />;
    }
    throw new Error(
      'At least one domain must be configured in the domain clients config.'
    );
  }

  return (
    <div>
      {navigationStack.current === ModalPage.MAIN && (
        <motion.div {...mainPageAnimation(navigationStack.direction)}>
          <MainPage onSelect={navigationStack.push} />
        </motion.div>
      )}
      {navigationStack.current === ModalPage.COSMOS && (
        <motion.div {...domainPageAnimation(navigationStack.direction)}>
          <ConnectCosmosPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}

      {navigationStack.current === ModalPage.EVM && (
        <motion.div {...domainPageAnimation(navigationStack.direction)}>
          <ConnectEthereumPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}

      {navigationStack.current === ModalPage.SOLANA && (
        <motion.div {...domainPageAnimation(navigationStack.direction)}>
          <ConnectSolanaPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}
    </div>
  );
};

const mainPageAnimation = (direction: number) => {
  return {
    layout: true,
    initial: { x: 100 * direction, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100 * direction, opacity: 0 },
    transition: { duration: 0.25 },
  };
};

const domainPageAnimation = (direction: number) => {
  return {
    layout: true,
    initial: { x: 100 * direction, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100 * direction, opacity: 0 },
    transition: { duration: 0.25 },
  };
};
