import { type SolanaConfig } from '@valence-protocol/domain-clients-core/solana';
import { createSolanaDevnet, createSolanaMainnet } from '@wallet-ui/react';

export const devnet = createSolanaDevnet();
export const mainnet = createSolanaMainnet();

export const solanaConfig: SolanaConfig = {
  clusters: [devnet, mainnet],
  defaultClusterId: devnet.id,
};
