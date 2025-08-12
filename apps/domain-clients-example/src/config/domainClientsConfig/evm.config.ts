import { mainnet } from 'wagmi/chains';
import { http } from 'wagmi';
import { createClient } from 'viem';
import { createEvmConfig } from '@valence-protocol/domain-clients-core';

const wagmiConfig = createEvmConfig({
  chains: [mainnet],
  ssr: true, // required for Next.js, prevents hydration errors
  client: ({ chain }) => {
    return createClient({
      chain,
      transport: http(chain.rpcUrls.default.http[0]),
    });
  },
});

export const evmConfig = {
  wagmiConfig,
  defaultChainId: mainnet.id,
};
