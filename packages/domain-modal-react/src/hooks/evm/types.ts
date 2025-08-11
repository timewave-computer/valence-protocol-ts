import { DomainConnector } from '@/hooks/common';

export type EvmConnector = Omit<DomainConnector, 'connect'> & {
  connect: (chainId: number) => Promise<void>;
};
