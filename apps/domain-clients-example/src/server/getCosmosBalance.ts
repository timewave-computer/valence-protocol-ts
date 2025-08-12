'use server';
import {
  CosmosClient,
  CosmosConfig,
} from '@valence-protocol/domain-clients-core';
import { domainClientsConfig } from '@/config/domainClientsConfig';

export const getCosmosBalance = async ({
  address,
  denom,
  chainId,
}: {
  address: string;
  denom: string;
  chainId: string;
}) => {
  const chainConfig = getChainConfig(chainId);
  const rpcUrl = chainConfig.rpc;
  const assetInfo = getAssetInfo(chainConfig, denom);
  const denomDecimals = assetInfo.coinDecimals;

  const cosmosClient = new CosmosClient({
    chainId,
    rpcUrl: rpcUrl,
  });

  const balance = await cosmosClient.getDenomBalance(address, denom);
  return {
    amount: balance.amount,
    denom: balance.denom,
    decimals: denomDecimals,
  };
};

const getChainConfig = (chainId: string) => {
  const config = domainClientsConfig.cosmos?.grazOptions.chains.find(
    chain => chain.chainId === chainId
  );
  if (!config) {
    throw new Error(`Chain ${chainId} not found in config`);
  }
  return config;
};

type ChainConfig = CosmosConfig['grazOptions']['chains'][number];
const getAssetInfo = (chainConfig: ChainConfig, denom: string) => {
  const denomInfo = chainConfig.currencies.find(
    currency => currency.coinMinimalDenom === denom
  );
  if (!denomInfo) {
    throw new Error(`Denom ${denom} not found in config`);
  }
  return denomInfo;
};
