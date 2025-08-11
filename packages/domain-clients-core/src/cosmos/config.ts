import { ConfigureGrazArgs } from "graz";
import { AminoTypes } from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';

export type CosmosConfig = {
    grazOptions: ConfigureGrazArgs;
    protobufRegistry?: Registry;
    aminoTypes?: AminoTypes;
  }