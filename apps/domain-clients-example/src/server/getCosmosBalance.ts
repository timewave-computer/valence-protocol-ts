'use server';
import {
  CosmosClient,
  type CosmosChainInfo,
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
  const chainInfo = getChainInfo(chainId);
  const rpcUrl = chainInfo.rpc;
  const assetInfo = getAssetInfo(chainInfo, denom);
  const denomDecimals = assetInfo.coinDecimals;

  const cosmosClient = new CosmosClient({
    chainId,
    rpcUrl: rpcUrl,
  });

  const balance = await cosmosClient.getDenomBalance({
    address,
    denom,
  });
  return {
    amount: balance.amount,
    denom: balance.denom,
    decimals: denomDecimals,
  };
};

const getChainInfo = (chainId: string): CosmosChainInfo => {
  const config = domainClientsConfig.cosmos?.grazOptions.chains.find(
    chain => chain.chainId === chainId
  );
  if (!config) {
    throw new Error(`Chain ${chainId} not found in config`);
  }
  return config;
};

const getAssetInfo = (chainInfo: CosmosChainInfo, denom: string) => {
  const denomInfo = chainInfo.currencies.find(
    currency => currency.coinMinimalDenom === denom
  );
  if (!denomInfo) {
    throw new Error(`Denom ${denom} not found in config`);
  }
  return denomInfo;
};
