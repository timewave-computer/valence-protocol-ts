import { EncodeObject, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { SigningStargateClient, DeliverTxResponse, Coin, StdFee, AminoTypes,  } from '@cosmjs/stargate';
import { SigningCosmWasmClient, ExecuteResult } from '@cosmjs/cosmwasm-stargate';
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";


import { SigningChainClient, ClientErrorType, ClientError } from '@/common';


export class SigningCosmosClient extends SigningChainClient {
  public readonly protobufRegistry?: Registry;
  public readonly aminoTypes?: AminoTypes;
  public readonly signer: OfflineSigner;

  constructor(
    chainId: string,
    rpcUrl: string,
    gas: number,
    signer: OfflineSigner,
    senderAddress: string,
    protobufRegistry?: Registry,
    aminoTypes?: AminoTypes
  ) {
    super(chainId, rpcUrl, gas, senderAddress);
    this.signer = signer;
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
      throw new ClientError(ClientErrorType.InvalidClient, 'Could not initialize stargate client');
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
      throw new ClientError(ClientErrorType.InvalidClient, 'Could not initialize cosmwasm client');
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

  async signTransaction(
    sender: string,
    messages: EncodeObject[],
    fee: StdFee,
    memo = '',
    funds: Coin[] = []
  ): Promise<TxRaw> {
    const client = await this.getSigningCosmwasmClient();
    return client.sign(sender, messages, fee, memo);
  }


  async submitTransaction(
    txRaw: TxRaw,
  ): Promise<string> {
    const client = await this.getSigningCosmwasmClient();
    const txBytes = TxRaw.encode(txRaw).finish();
    return client.broadcastTxSync(txBytes);
  }


  async signAndSubmitTransaction(
    sender: string,
    messages: EncodeObject[],
    fee: StdFee,
    memo = '',
    funds: Coin[] = []
  ): Promise<string> {
    const txRaw = await this.signTransaction(sender, messages, fee, memo, funds);
    return this.submitTransaction(txRaw);
  }

  async executeMessageBatch(
    messages: EncodeObject[],
    fee: StdFee | 'auto',
    memo = ''
  ): Promise<DeliverTxResponse> {

      const client = await this.getSigningStargateClient();
      return client.signAndBroadcast(this.senderAddress, messages, fee, memo);

  }

  buildMsgExecuteContract(
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