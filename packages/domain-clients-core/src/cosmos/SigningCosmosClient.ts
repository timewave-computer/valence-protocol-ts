import {
  EncodeObject,
  OfflineDirectSigner,
  Registry,
} from '@cosmjs/proto-signing';
import {
  SigningStargateClient,
  DeliverTxResponse,
  Coin,
  StdFee,
  AminoTypes,
} from '@cosmjs/stargate';
import {
  SigningCosmWasmClient,
  ExecuteResult,
} from '@cosmjs/cosmwasm-stargate';
import { OfflineAminoSigner } from '@cosmjs/amino';
import { TextEncoder } from 'util';
import { SigningChainClient, ClientErrorType, ClientError } from '@/common';

export type CosmosSigner = OfflineAminoSigner & OfflineDirectSigner;
export type CosmosGas = {
  price: string;
  denom: string;
};

export interface SigningCosmosClientConfig {
  chainId: string;
  rpcUrl: string;
  gas?: CosmosGas;
  signer?: CosmosSigner;
  senderAddress?: string;
  protobufRegistry?: Registry;
  aminoTypes?: AminoTypes;
}

export class SigningCosmosClient extends SigningChainClient {
  public readonly protobufRegistry?: Registry;
  public readonly aminoTypes?: AminoTypes;
  public readonly signer?: CosmosSigner;
  public readonly gas?: CosmosGas;
  public readonly senderAddress?: string;
  public readonly chainId: string;
  public readonly rpcUrl: string;

  constructor(args: SigningCosmosClientConfig) {
    super();
    this.chainId = args.chainId;
    this.rpcUrl = args.rpcUrl;
    this.gas = args.gas;
    this.senderAddress = args.senderAddress;
    this.signer = args.signer;
    this.protobufRegistry = args.protobufRegistry;
    this.aminoTypes = args.aminoTypes;
  }

  async getSigningStargateClient(): Promise<SigningStargateClient> {
    if (!this.signer) {
      throw new ClientError(
        ClientErrorType.InvalidSigner,
        'Cosmos offline signer is not set'
      );
    }
    try {
      return SigningStargateClient.connectWithSigner(this.rpcUrl, this.signer, {
        registry: this.protobufRegistry,
        aminoTypes: this.aminoTypes,
        gasPrice: undefined, // Optionally set gas price here
      });
    } catch (error) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize stargate client'
      );
    }
  }

  async getSigningCosmwasmClient(): Promise<SigningCosmWasmClient> {
    if (!this.signer) {
      throw new ClientError(
        ClientErrorType.InvalidSigner,
        'Cosmos offline signer is not set'
      );
    }
    try {
      return SigningCosmWasmClient.connectWithSigner(
        this.rpcUrl,
        this.signer
        // Optionally add gas price, registry, aminoTypes
      );
    } catch (error) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize cosmwasm client'
      );
    }
  }

  async sendTokens({
    recipient,
    amount,
    fee = 'auto',
    memo = '',
  }: {
    recipient: string;
    amount: Coin[];
    fee?: StdFee | 'auto';
    memo?: string;
  }): Promise<DeliverTxResponse> {
    if (!this.senderAddress) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Sender address is not set'
      );
    }
    const client = await this.getSigningStargateClient();

    return client.sendTokens(this.senderAddress, recipient, amount, fee, memo);
  }

  async executeMessage(
    sender: string,
    contractAddress: string,
    messageBody: object,
    fee: StdFee | 'auto',
    memo = '',
    funds: Coin[] = []
  ): Promise<ExecuteResult> {
    const client = await this.getSigningCosmwasmClient();
    return client.execute(
      sender,
      contractAddress,
      messageBody,
      fee,
      memo,
      funds
    );
  }

  async executeMessageBatch(
    messages: EncodeObject[],
    fee: StdFee | 'auto',
    memo = ''
  ): Promise<DeliverTxResponse> {
    if (!this.senderAddress) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Sender address is not set'
      );
    }
    const client = await this.getSigningStargateClient();
    return client.signAndBroadcast(this.senderAddress, messages, fee, memo);
  }

  // It is recommended to use ts-codegen for type safety and pass the appropriate client
  buildExecuteContractMsg(
    contractAddress: string,
    msg: object,
    funds: Coin[] = [],
    sender?: string
  ): EncodeObject {
    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: {
        sender: sender || this.senderAddress,
        contract: contractAddress,
        msg: new TextEncoder().encode(JSON.stringify(msg)),
        funds: funds,
      },
    };
  }
}
