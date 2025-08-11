import { isAddress as viemIsAddress } from 'viem';

export function isAddress(address: string | `0x${string}`): address is `0x${string}` {
  return viemIsAddress(address);
}