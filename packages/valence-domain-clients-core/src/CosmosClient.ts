import { ChainClient } from './ChainClient';
import { StargateClient } from '@cosmjs/stargate';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { z } from 'zod';

export class CosmosClient extends ChainClient {
  constructor(chainId: string, rpcUrl: string) {
    super(chainId, rpcUrl);
  }

  // Cosmos specific
  async getStargateClient(): Promise<StargateClient> {
    return StargateClient.connect(this.rpcUrl);
  }

  async getCosmwasmClient(): Promise<CosmWasmClient> {
    return CosmWasmClient.connect(this.rpcUrl);
  }

  // Inherited required methods
  async getBalance(address: string, denom: string): Promise<any> {
    const client = await this.getStargateClient();
    return client.getBalance(address, denom);
  }

  // Without ts-codegen (recommended to use ts-codegen, docs below)
  async queryContract<T extends z.ZodTypeAny>(
    address: string,
    queryObject: object | string,
    responseSchema: T
  ): Promise<z.infer<T>> {
    const client = await this.getCosmwasmClient();
    const result = await client.queryContractSmart(address, queryObject);
    return responseSchema.parse(result);
  }
} 