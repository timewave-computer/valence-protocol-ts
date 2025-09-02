'use client';
import { MainPage, useModalNavigation, ModalPage } from '@/ui/main';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { ConnectCosmosPage } from '@/ui/cosmos';
import { ConnectEthereumPage } from '@/ui/evm';
import { ConnectSolanaPage } from '@/ui/solana';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence mode='wait'>
      {navigationStack.current === ModalPage.MAIN && (
        <motion.div
          key={ModalPage.MAIN} // key is required for resize animation to work
          layout // for resize animation to work
          {...mainPageAnimation(navigationStack.direction)}
        >
          <MainPage onSelect={navigationStack.push} />
        </motion.div>
      )}
      {navigationStack.current === ModalPage.COSMOS && (
        <motion.div
          key={ModalPage.COSMOS} // key is required for resize animation to work
          layout // for resize animation to work
          {...domainPageAnimation(navigationStack.direction)}
        >
          <ConnectCosmosPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}

      {navigationStack.current === ModalPage.EVM && (
        <motion.div
          key={ModalPage.EVM} // key is required for resize animation to work
          layout // for resize animation to work
          {...domainPageAnimation(navigationStack.direction)}
        >
          <ConnectEthereumPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}

      {navigationStack.current === ModalPage.SOLANA && (
        <motion.div
          key={ModalPage.SOLANA} // key is required for resize animation to work
          layout // for resize animation to work
          {...domainPageAnimation(navigationStack.direction)}
        >
          <ConnectSolanaPage onBack={() => navigationStack.pop()} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const mainPageAnimation = (direction: number) => {
  return {
    initial: { x: 50 * direction, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.25 },
  };
};

const domainPageAnimation = (direction: number) => {
  return {
    initial: { x: 50 * direction, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.25 },
  };
};
