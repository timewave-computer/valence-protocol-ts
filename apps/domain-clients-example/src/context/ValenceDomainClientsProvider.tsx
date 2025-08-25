'use client';

import { DomainClientsProvider } from '@valence-protocol/domain-clients-react';
import { domainClientsConfig } from '@/config';
import { ComponentProps } from 'react';

type ValenceDomainClientsProviderProps = Omit<
  ComponentProps<typeof DomainClientsProvider>,
  'config'
>;

/***
 * This client wrapper is required if using component with Next.js RSC
 */

export const ValenceDomainClientsProvider = ({
  children,
  ...rest
}: ValenceDomainClientsProviderProps) => {
  return (
    <DomainClientsProvider config={domainClientsConfig} {...rest}>
      {children}
    </DomainClientsProvider>
  );
};
