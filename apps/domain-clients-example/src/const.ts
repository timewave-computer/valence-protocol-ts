import { type Address } from 'viem';
import { neutron } from 'graz/chains';
import { mainnet } from 'viem/chains';

export const evmUsdc = {
  chainId: mainnet.id,
  symbol: 'USDC',
  tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as Address,
};

export const evmUser: Address = '0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c'; // AAVE protocol

export const neutronNtrn = {
  chainId: neutron.chainId,
  symbol: 'NTRN',
  denom: 'untrn',
  decimals: 6, // hardcoded for brevity
};
export const neutronUser = 'neutron1fl48vsnmsdzcv85q5d2q4z5ajdha8yu33yqdrs'; // Top holder

export const solanaUsdc = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
