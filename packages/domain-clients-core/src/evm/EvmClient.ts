import { getPublicClient, Config } from '@wagmi/core';
import {
  Abi,
  ReadContractParameters,
  ContractFunctionName,
  ContractFunctionArgs,
  erc20Abi,
  ReadContractReturnType,
  Address,
  PublicClient,
  TransactionReceipt,
} from 'viem';

import { ChainClient, ClientError, ClientErrorType } from '@/common';
import { isAddress } from '@/evm';

export interface EvmClientArgs {
  config: Config;
  chainId: number;
}

export class EvmClient extends ChainClient {
  public readonly config: Config;
  public readonly chainId: number;

  constructor(args: EvmClientArgs) {
    super();
    this.config = args.config;
    this.chainId = args.chainId;
  }

  getPublicClient(): PublicClient {
    const client = getPublicClient(this.config, {
      chainId: this.chainId,
    });
    if (!client) {
      throw new ClientError(
        ClientErrorType.InvalidClient,
        'Could not initialize public client'
      );
    }
    return client;
  }

  async getEthBalance({ address }: { address: string }): Promise<bigint> {
    if (!isAddress(address)) {
      throw new ClientError(ClientErrorType.InvalidAddress, 'Invalid address');
    }
    const client = this.getPublicClient();
    return client.getBalance({ address });
  }

  async getErc20Balance({
    erc20Address,
    address,
  }: {
    erc20Address: Address;
    address: Address;
  }): Promise<bigint> {
    if (!isAddress(erc20Address)) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Invalid erc20 address'
      );
    }
    if (!isAddress(address)) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Invalid wallet address'
      );
    }
    return this.queryContract({
      abi: erc20Abi,
      functionName: 'balanceOf',
      address: erc20Address,
      args: [address],
    });
  }

  async queryContract<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      'pure' | 'view'
    > = ContractFunctionName<abi, 'pure' | 'view'>,
    args extends ContractFunctionArgs<
      abi,
      'pure' | 'view',
      functionName
    > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  >(
    args: ReadContractParameters<abi, functionName, args>
  ): Promise<ReadContractReturnType<abi, functionName, args>> {
    const client = this.getPublicClient();
    if (!isAddress(args.address as string)) {
      throw new ClientError(
        ClientErrorType.InvalidAddress,
        'Invalid contract address'
      );
    }
    return client.readContract(args);
  }

  async waitForTransactionReceipt({
    txHash,
  }: {
    txHash: Address;
  }): Promise<TransactionReceipt> {
    const client = this.getPublicClient();
    return client.waitForTransactionReceipt({ hash: txHash });
  }
}
