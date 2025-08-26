'use client';
import { domainClientsConfig } from '@/config';
import { ReactQueryProvider } from '@/context';
import { DomainClientsProvider } from '@valence-protocol/domain-clients-react';
import { DomainModalProvider } from '@valence-protocol/domain-modal-react';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <DomainClientsProvider config={domainClientsConfig}>
        <DomainModalProvider>{children}</DomainModalProvider>
      </DomainClientsProvider>
    </ReactQueryProvider>
  );
};
