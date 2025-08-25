import { DomainConnector } from '@/hooks/common';

export type SolanaConnector = Omit<DomainConnector, 'connect'> & {
  connect: () => Promise<void>;
};
