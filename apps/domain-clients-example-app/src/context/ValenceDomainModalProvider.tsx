'use client'; 

import {DomainModalProvider} from '@valence-protocol/domain-modal-react';
import {type ComponentProps} from 'react';

type ValenceDomainModalProviderProps = ComponentProps<typeof DomainModalProvider>

/***
 * This client wrapper is required if using component with Next.js RSC
 */

export const ValenceDomainModalProvider = ({ children, ...rest }: ValenceDomainModalProviderProps) => {
  return <DomainModalProvider {...rest}>{children}</DomainModalProvider>;
};