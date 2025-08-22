import {
  TOKEN_PROGRAM_ADDRESS,
  TOKEN_2022_PROGRAM_ADDRESS,
} from 'gill/programs';
import type { DevnetUrl, LocalnetUrl, MainnetUrl, TestnetUrl } from 'gill';

export type SolanaTokenProgramId =
  | typeof TOKEN_PROGRAM_ADDRESS
  | typeof TOKEN_2022_PROGRAM_ADDRESS;

export type SolanaUrlOrMoniker =
  | DevnetUrl
  | LocalnetUrl
  | MainnetUrl
  | TestnetUrl
  | string;

export type SolanaClusterId = `solana:${string}`;

export type SolanaClusterMoniker =
  | 'devnet'
  | 'localnet'
  | 'mainnet'
  | 'testnet';

export interface SolanaCluster {
  cluster: SolanaClusterMoniker;
  id: SolanaClusterId;
  label: string;
  urlOrMoniker: SolanaUrlOrMoniker;
}
