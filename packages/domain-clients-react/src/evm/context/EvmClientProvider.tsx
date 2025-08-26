'use client';
import { ReactNode } from 'react';
import { useDomainConfig } from '@/common';
import { WagmiProvider } from 'wagmi';

export const EvmClientProvider = ({ children }: { children: ReactNode }) => {
  const config = useDomainConfig();
  if (!config.evm) {
    return children;
  }
  return (
    <WagmiProvider config={config.evm.wagmiConfig}>{children}</WagmiProvider>
  );
};
