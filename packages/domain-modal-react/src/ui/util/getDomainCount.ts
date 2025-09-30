import { DomainClientsConfig } from '@valence-protocol/domain-clients-react';

export const getDomainCount = (config: DomainClientsConfig) => {
  return Object.values(config).filter(value => !value.hide).length;
};
