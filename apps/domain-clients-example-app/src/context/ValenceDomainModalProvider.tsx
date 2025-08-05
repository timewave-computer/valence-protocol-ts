'use client'; 

/***
 * This client wrapper is required if using component with Next.js RSC
 */
import {DomainModalProvider} from '@valence-protocol/domain-modal-react';
export const ValenceDomainModalProvider = ({ children }: { children: React.ReactNode }) => {
  return <DomainModalProvider>{children}</DomainModalProvider>;
};