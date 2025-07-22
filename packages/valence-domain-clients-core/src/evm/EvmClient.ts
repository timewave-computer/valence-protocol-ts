import { ChainClient } from '../common/ChainClient';
import {  throwClientError } from '../common/errors';
import {  PublicClient } from 'wagmi';
import { isAddress } from './typeguards';
import { getPublicClient } from '@wagmi/core'
import { EvmConfig } from './types';
import { Abi, ReadContractParameters, ContractFunctionName, ContractFunctionArgs, erc20Abi, ReadContractReturnType, Address } from 'viem';


export class EvmClient extends ChainClient {
  public readonly config: EvmConfig;

  constructor(chainId: string, rpcUrl: string, config: EvmConfig) {
    super(chainId, rpcUrl);
    this.config = config;
  }

  // EVM specific
  getPublicClient(): PublicClient {
    // You may need to adjust this to pass config as needed
    const client= getPublicClient(this.config);
    if (!client) {
      throwClientError('InvalidClient', 'Could not initialize public client');
    }
    return client;
  }

  async getEthBalance(address: string): Promise<any> {
    if (!isAddress(address)) {
      throwClientError('InvalidAddress', 'Invalid address');
    }
    const client = this.getPublicClient();
    return client.getBalance({ address });
  }

  async getErc20Balance(erc20Address: Address, address: Address): Promise<bigint> {
    if (!isAddress(erc20Address)) {
      throwClientError('InvalidAddress', 'Invalid address');
    }
    if (!isAddress(address)) {
      throwClientError('InvalidAddress', 'Invalid address');
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
      throwClientError('InvalidAddress', 'Invalid address');
    }
    return client.readContract(args);
  }
}
