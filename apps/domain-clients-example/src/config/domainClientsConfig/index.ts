import { evmConfig } from './evm.config';
import { cosmosConfig } from './cosmos.config';
import { solanaConfig } from './solana.config';
import { DomainClientsConfig } from '@valence-protocol/domain-clients-react';

export const domainClientsConfig: DomainClientsConfig = {
  evm: evmConfig,
  cosmos: cosmosConfig,
  solana: solanaConfig,
};
