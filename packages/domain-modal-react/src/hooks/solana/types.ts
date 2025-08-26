import { DomainConnector } from '@/hooks/common';
import { UiWalletAccount } from '@wallet-ui/react';

export type SolanaConnector = DomainConnector & {
  connect: () => Promise<void>;
  account: UiWalletAccount;
};
