'use client';
import { ReactNode } from 'react';
import { GrazProvider } from 'graz';
import { useDomainConfig } from '@/common';

export const CosmosClientProvider = ({ children }: { children: ReactNode }) => {
  const config = useDomainConfig();

  if (!config.cosmos) {
    return children;
  }

  return (
    <GrazProvider grazOptions={config.cosmos.grazOptions}>
      {children}
    </GrazProvider>
  );
};
