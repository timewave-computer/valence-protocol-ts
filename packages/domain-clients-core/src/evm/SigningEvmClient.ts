import { getWalletClient, Config } from '@wagmi/core';
import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  SendTransactionReturnType,
  WriteContractParameters,
  WriteContractReturnType,
  WalletClient,
  isAddress,
} from 'viem';
import { SigningChainClient, ClientErrorType, ClientError } from '@/common';

export interface SigningEvmClientArgs {
  config: Config;
  signer?: WalletClient;
  chainId?: number;
}

export class SigningEvmClient extends SigningChainClient {
  public readonly config: Config;
  public readonly signer?: WalletClient;
  public readonly chainId?: number;

  constructor(args: SigningEvmClientArgs) {
    super();
    this.config = args.config;
    this.signer = args.signer;
    this.chainId = args.chainId;
  }

  async getSenderAddress(): Promise<Address> {
    if (!this.signer?.account) {
      throw new ClientError(
        ClientErrorType.InvalidSigner,
        'Signer account is not set'
      );
    }
    const senderAddress = this.signer.account.address;
    if (!isAddress(senderAddress)) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Sender address is not set'
      );
    }
    return this.signer.account.address;
  }

  // EVM specific
  async getWalletClient(): Promise<WalletClient> {
    const client = await getWalletClient(this.config, {
      chainId: this.chainId,
    });
    if (!client) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize wallet client'
      );
    }
    return client;
  }

  async executeMessage<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      'payable' | 'nonpayable'
    > = ContractFunctionName<abi, 'payable' | 'nonpayable'>,
    args extends ContractFunctionArgs<
      abi,
      'payable' | 'nonpayable',
      functionName
    > = ContractFunctionArgs<abi, 'payable' | 'nonpayable', functionName>,
  >(
    args: WriteContractParameters<abi, functionName, args>
  ): Promise<WriteContractReturnType> {
    const client = await this.getWalletClient();
    return client.writeContract(args);
  }

  async sendTokens(args: {
    to: Address;
    value: bigint;
  }): Promise<SendTransactionReturnType> {
    const client = await this.getWalletClient();
    const senderAddress = await this.getSenderAddress();

    if (!isAddress(args.to)) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Recipient address is not set'
      );
    }

    return client.sendTransaction({
      account: senderAddress,
      to: args.to,
      value: args.value,
      chain: null,
    });
  }

  async executeMessageBatch(): Promise<unknown> {
    throw new Error('Not implemented');
  }
}
