import { ConfigureGrazArgs } from 'graz';
import { AminoTypes } from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';

export type CosmosConfig = {
  grazOptions: ConfigureGrazArgs;
  protobufRegistry?: Registry;
  aminoTypes?: AminoTypes;
  defaultChainId: string;
};

export type CosmosChainInfo = CosmosConfig['grazOptions']['chains'][number];
export type CosmosChainConfig = NonNullable<
  CosmosConfig['grazOptions']['chainsConfig']
>[string];
