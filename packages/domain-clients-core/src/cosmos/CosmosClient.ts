import { ChainClient, ClientError, ClientErrorType } from '@/common';
import { StargateClient, Coin } from '@cosmjs/stargate';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { z } from 'zod';

export interface CosmosClientArgs {
  chainId: string;
  rpcUrl: string;
}

export class CosmosClient extends ChainClient {
  public readonly rpcUrl: string;
  public readonly chainId: string;

  constructor(args: CosmosClientArgs) {
    super();
    this.rpcUrl = args.rpcUrl;
    this.chainId = args.chainId;
  }

  async getStargateClient(): Promise<StargateClient> {
    try {
      return StargateClient.connect(this.rpcUrl);
    } catch (error) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize stargate client'
      );
    }
  }

  async getCosmwasmClient(): Promise<CosmWasmClient> {
    try {
      return CosmWasmClient.connect(this.rpcUrl);
    } catch (error) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize cosmwasm client'
      );
    }
  }

  async queryDenomBalance({
    address,
    denom,
  }: {
    address: string;
    denom: string;
  }): Promise<Coin> {
    const client = await this.getStargateClient();
    return client.getBalance(address, denom);
  }

  // Raw untyped query. It is recommended to use ts-codegen for type safety and pass the appropriate client
  async queryContract<T extends z.ZodTypeAny>({
    address,
    queryObject,
    responseSchema,
  }: {
    address: string;
    queryObject: object | string;
    responseSchema: T;
  }): Promise<z.infer<T>> {
    const client = await this.getCosmwasmClient();
    const result = await client.queryContractSmart(address, queryObject);
    return responseSchema.parse(result);
  }
}
