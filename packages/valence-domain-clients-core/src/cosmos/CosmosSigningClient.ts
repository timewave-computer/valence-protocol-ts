import { EncodeObject, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { SigningStargateClient, DeliverTxResponse, Coin, StdFee, AminoTypes } from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { SigningChainClient, ClientErrorType, throwClientError } from '@/common';


export class SigningCosmosClient extends SigningChainClient {
  public readonly protobufRegistry?: Registry;
  public readonly aminoTypes?: AminoTypes;

  constructor(
    chainId: string,
    rpcUrl: string,
    gas: number,
    signer: OfflineSigner,
    senderAddress: string,
    protobufRegistry?: Registry,
    aminoTypes?: AminoTypes
  ) {
    super(chainId, rpcUrl, gas, signer, senderAddress);
    this.protobufRegistry = protobufRegistry;
    this.aminoTypes = aminoTypes;
  }

  // Cosmos specific
  async getSigningStargateClient(): Promise<SigningStargateClient> {
    try {
    return SigningStargateClient.connectWithSigner(
      this.rpcUrl,
      this.signer,
      {
        registry: this.protobufRegistry,
        aminoTypes: this.aminoTypes,
        gasPrice: undefined // Optionally set gas price here
      }
    );
    } catch (error) {
      throwClientError(ClientErrorType.InvalidClient, 'Could not initialize stargate client');
    }
  }

  async getSigningCosmwasmClient(): Promise<SigningCosmWasmClient> {
    try {
    return SigningCosmWasmClient.connectWithSigner(
      this.rpcUrl,
      this.signer
      // Optionally add gas price, registry, aminoTypes
    );
    } catch (error) {
      throwClientError(ClientErrorType.InvalidClient, 'Could not initialize cosmwasm client');
    }
  }


  async sendTokens(
    recipient: string,
    amount: Coin[],
    fee: StdFee | 'auto',
    memo = ''
  ): Promise<DeliverTxResponse> {
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
  ): Promise<any> { // Use any to avoid type mismatch
    const client = await this.getSigningCosmwasmClient();
    return client.execute(sender, contractAddress, messageBody, fee, memo, funds);
  }

  async executeMessageBatch(
    messages: EncodeObject[],
    fee: StdFee | 'auto',
    memo = ''
  ): Promise<DeliverTxResponse> {

      const client = await this.getSigningStargateClient();
      return client.signAndBroadcast(this.senderAddress, messages, fee, memo);

  }

  // Cosmos only
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
        funds: funds
      }
    };
  }
} 