'use client';

import { DomainModalProvider } from '@valence-protocol/domain-modal-react';
import { type ComponentProps } from 'react';
import { domainClientsConfig } from '@/config';

type ValenceDomainModalProviderProps = Omit<
  ComponentProps<typeof DomainModalProvider>,
  'config'
>;

/***
 * This client wrapper is required if using component with Next.js RSC
 */

export const ValenceDomainModalProvider = ({
  children,
  ...rest
}: ValenceDomainModalProviderProps) => {
  return (
    <DomainModalProvider config={domainClientsConfig} {...rest}>
      {children}
    </DomainModalProvider>
  );
};
