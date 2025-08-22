import { createContext } from 'react';
import { SolanaClient } from '@valence-protocol/domain-clients-core/solana';

const SolanaClientConext = createContext<SolanaClient | undefined>(undefined);

export const SolanaClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SolanaClientConext.Provider value={{}}>
      {children}
    </SolanaClientConext.Provider>
  );
};
