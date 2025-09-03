import { type CosmosConfig } from '@valence-protocol/domain-clients-core/cosmos';
import { neutron, neutrontestnet } from 'graz/chains'; // need to run `graz generate -g` first

export const cosmosConfig: CosmosConfig = {
  grazOptions: {
    autoReconnect: false, // default behavior is to prompt user to reconnect when page loads
    chains: [neutron, neutrontestnet],
    chainsConfig: {
      [neutron.chainId]: {
        gas: {
          price: '0.1',
          denom: 'untrn',
        },
      },
      [neutrontestnet.chainId]: {
        gas: {
          price: '0.1',
          denom: 'untrn',
        },
      },
    },
  },
  defaultChainId: neutrontestnet.chainId,
  hide: true,
};
