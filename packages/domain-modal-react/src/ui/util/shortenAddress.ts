import { ChainType } from '@/hooks/common';

export function detectAddressType(address: string): ChainType | undefined {
  if (!address) return undefined;

  // EVM: starts with 0x + 40 hex chars
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return ChainType.Evm;
  }

  // Cosmos: Bech32 style — lowercase, prefix + 1 + 38 payload chars
  if (/^[a-z0-9]+1[ac-hj-np-z02-9]{38}$/.test(address)) {
    return ChainType.Cosmos;
  }

  // Solana: Base58, typically 32–44 chars, excludes 0, O, I, l
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return ChainType.Solana;
  }

  return undefined;
}

/**
 * Shortens an address depending on chain type.
 * - EVM: 0x1234…abcd
 * - Cosmos: cosmos1abcd…wxyz
 */
export function shortenAddress(address: string): string {
  if (!address) return '';

  switch (detectAddressType(address)) {
    case ChainType.Cosmos:
      return `${address.slice(0, 6)}…${address.slice(-4)}`;

    case ChainType.Solana:
      return `${address.slice(0, 4)}…${address.slice(-4)}`;
    case ChainType.Evm:
    default:
      return `${address.slice(0, 6)}…${address.slice(-4)}`;
  }
}
