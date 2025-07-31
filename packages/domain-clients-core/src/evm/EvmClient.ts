import { getPublicClient } from '@wagmi/core';
import { Abi, ReadContractParameters, ContractFunctionName, ContractFunctionArgs, erc20Abi, ReadContractReturnType, Address, PublicClient } from 'viem';

import { ChainClient, ClientError, ClientErrorType } from '@/common';
import { isAddress,EvmConfig } from '@/evm';


export class EvmClient extends ChainClient {
  public readonly config: EvmConfig;
  
  constructor(config: EvmConfig) {
    super()
    this.config = config;
  }

  // EVM specific
  getPublicClient(): PublicClient {
    // You may need to adjust this to pass config as needed
    const client = getPublicClient(this.config);
    if (!client) {
      throw new ClientError(ClientErrorType.InvalidClient, 'Could not initialize public client');
    }
    return client;
  }

  async getEthBalance(address: string): Promise<bigint> {
    if (!isAddress(address)) {
      throw new ClientError(ClientErrorType.InvalidAddress, 'Invalid address');
    }
    const client = this.getPublicClient();
    return client.getBalance({ address });
  }

  async getErc20Balance(erc20Address: Address, address: Address): Promise<bigint> {
    if (!isAddress(erc20Address)) {
      throw new ClientError(ClientErrorType.InvalidAddress, 'Invalid erc20 address');
    }
    if (!isAddress(address)) {
      throw new ClientError(ClientErrorType.InvalidAddress, 'Invalid wallet address');
    }
    return this.queryContract({
      abi: erc20Abi,
      functionName: 'balanceOf',
      address:erc20Address,
      args: [address],
    });
  }

  async queryContract<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<abi, 'pure' | 'view'> = ContractFunctionName<abi, 'pure' | 'view'>,
    args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName> = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  >(
    args: ReadContractParameters<abi, functionName, args>
  ): Promise<ReadContractReturnType<abi, functionName, args>> {
    const client = this.getPublicClient();
    if (!isAddress(args.address as string)) {
      throw new ClientError(ClientErrorType.InvalidAddress, 'Invalid contract address');
    }
    return client.readContract(args);
  }
}
