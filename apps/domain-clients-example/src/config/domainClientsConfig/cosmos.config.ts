import { type CosmosConfig } from '@valence-protocol/domain-clients-core';
import { neutron, neutrontestnet } from 'graz/chains'; // need to run `graz generate -g` first

export const cosmosConfig: CosmosConfig = {
  grazOptions: {
    chains: [neutron, neutrontestnet],
    chainsConfig: {
      'neutron-1': {
        gas: {
          price: '0.005',
          denom: 'untrn',
        },
      },
      'pion-1': {
        // neutron testnet
        gas: {
          price: '0.005',
          denom: 'untrn',
        },
      },
    },
  },
  defaultChainId: 'neutron-1',
};
