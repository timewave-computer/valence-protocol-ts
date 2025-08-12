'use client';
import { ReactNode } from 'react';
import { useEvmConfig } from '@/evm/hooks';
import { WagmiProvider } from 'wagmi';

export const EvmClientProvider = ({ children }: { children: ReactNode }) => {
  const config = useEvmConfig();
  return <WagmiProvider config={config.wagmiConfig}>{children}</WagmiProvider>;
};
