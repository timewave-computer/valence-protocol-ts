'use server';
import { domainClientsConfig } from '@/config/domainClientsConfig';
import { EvmClient } from '@valence-protocol/domain-clients-core';
import { type Address, erc20Abi } from 'viem';

export const getEthErc20Balance = async ({
  address,
  erc20Address,
  chainId,
}: {
  address: Address;
  erc20Address: Address;
  chainId: number;
}) => {
  const config = domainClientsConfig.evm;
  if (!config) {
    throw new Error('EVM config not found');
  }
  const evmClient = new EvmClient({
    config: config.wagmiConfig,
    chainId,
  });
  const balance = await evmClient.getErc20Balance({
    erc20Address,
    address,
  });
  const decimals = await evmClient.queryContract({
    abi: erc20Abi,
    functionName: 'decimals',
    address: erc20Address,
  });
  return {
    balance,
    decimals,
  };
};
