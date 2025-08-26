import { type SolanaConfig } from '@valence-protocol/domain-clients-core/solana';
import { createSolanaDevnet, createSolanaMainnet } from '@wallet-ui/react';

const devnet = createSolanaDevnet();
const mainnet = createSolanaMainnet();

export const solanaConfig: SolanaConfig = {
  clusters: [devnet, mainnet],
  defaultUrlOrMoniker: devnet.urlOrMoniker,
};
