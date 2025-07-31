import { ChainClient, ClientError, ClientErrorType } from '@/common';
import { StargateClient, Coin } from '@cosmjs/stargate';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { z } from 'zod';

export class CosmosClient extends ChainClient {
  constructor(chainId: string, rpcUrl: string) {
    super(chainId, rpcUrl);
  }

  // Cosmos specific
  async getStargateClient(): Promise<StargateClient> {
    try {
      return StargateClient.connect(this.rpcUrl);
    } catch (error) {

      throw new ClientError(ClientErrorType.InvalidClient, 'Could not initialize stargate client',);
    }
  }

  async getCosmwasmClient(): Promise<CosmWasmClient> {
    try {
      return CosmWasmClient.connect(this.rpcUrl);
    } catch (error) {
      throw new ClientError(ClientErrorType.InvalidClient, 'Could not initialize cosmwasm client');
    }
  }

  // Inherited required methods
  async getDenomBalance(address: string, denom: string): Promise<Coin> {
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