import { type CosmosConfig } from '@valence-protocol/domain-clients-core';
import { neutron, cosmoshub } from 'graz/chains'; // need to run `graz generate -g` first

export const cosmosConfig: CosmosConfig = {
  grazOptions: {
    chains: [neutron, cosmoshub],
    chainsConfig: {
      'neutron-1': {
        gas: {
          price: '0.005',
          denom: 'untrn',
        },
      },
    },
  },
  defaultChainId: 'neutron-1',
};
