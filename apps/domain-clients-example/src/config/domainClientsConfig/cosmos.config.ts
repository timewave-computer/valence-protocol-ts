import { type CosmosConfig } from '@valence-protocol/domain-clients-core';
import { neutron, cosmoshub } from 'graz/chains'; // need to run `graz generate -g` first

export const cosmosConfig: CosmosConfig = {
  grazOptions: {
    chains: [neutron, cosmoshub],
  },
  defaultChainId: 'neutron-1',
};
