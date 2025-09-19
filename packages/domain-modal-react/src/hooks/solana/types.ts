import { DomainConnector } from '@/hooks/common';
import { Wallet } from '@solana/wallet-adapter-react';

// connect needs to be done via hook (for now)
export type SolanaConnector = Omit<DomainConnector, 'connect'> & {
  wallet: Wallet;
  connect: () => Promise<void>;
};
