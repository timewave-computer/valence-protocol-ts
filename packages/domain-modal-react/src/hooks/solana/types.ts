import { DomainConnector } from '@/hooks/common';
import { UiWallet } from '@wallet-ui/react';

// connect needs to be done via hook (for now)
export type SolanaConnector = Omit<DomainConnector, 'connect'> & {
  wallet: UiWallet;
};
