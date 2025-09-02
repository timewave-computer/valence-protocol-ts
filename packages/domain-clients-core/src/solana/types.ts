import {
  TOKEN_PROGRAM_ADDRESS,
  TOKEN_2022_PROGRAM_ADDRESS,
} from 'gill/programs';
import type { DevnetUrl, LocalnetUrl, MainnetUrl, TestnetUrl } from 'gill';
import { DomainClientConfig } from '@/common';

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

interface _WalletUiSolanaCluster {
  cluster: SolanaClusterMoniker;
  id: SolanaClusterId;
  label: string;
  urlOrMoniker: SolanaUrlOrMoniker;
}

export interface SolanaCluster
  extends Omit<_WalletUiSolanaCluster, 'urlOrMoniker'> {
  url: string;
}

/**
 * Type guard to check if a string starts with "solana:"
 * @param value - The string to check
 * @returns True if the string starts with "solana:", false otherwise
 */
export function isSolanaClusterId(value: string): value is `solana:${string}` {
  return value.startsWith('solana:');
}

export interface SolanaConfig extends DomainClientConfig {
  clusters: _WalletUiSolanaCluster[];
  defaultClusterId: SolanaClusterId;
}
