import {  mainnet } from "wagmi/chains";
import {  http } from "wagmi";
import { Chain, createClient } from "viem";

import {  createEvmConfig } from "@valence-protocol/domain-clients-core";

export const evmConfig =  createEvmConfig({
  chains: [mainnet],
  ssr: true, // required for Next.js, prevents hydration errors
  client({ chain }: { chain: Chain }) {
    return createClient({
      chain,
      transport: http(chain.rpcUrls.default.http[0]),
    });
  },
});