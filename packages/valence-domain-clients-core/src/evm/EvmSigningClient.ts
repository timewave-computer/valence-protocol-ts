import {  SigningChainClient,throwClientError } from '../common/';
import {  Address, WalletClient } from 'wagmi';
import { getWalletClient } from '@wagmi/core'
import { EvmConfig } from './types';
import { Abi, ContractFunctionArgs, ContractFunctionName, SendTransactionReturnType, WriteContractParameters, WriteContractReturnType } from 'viem';

export class EvmSigningClient extends SigningChainClient {
  public readonly config: EvmConfig;
  
    constructor(
      chainId: string,
      rpcUrl: string,
      gas: number,
      signer: any, // WalletClient or similar
      senderAddress: string,
      config: EvmConfig
    ) {
      super(chainId, rpcUrl, gas, signer, senderAddress);
      this.config = config;

    }
  
    // EVM specific
    async getWalletClient(): Promise<WalletClient> {
  
      const client = await getWalletClient(this.config);
      if (!client) {
        throwClientError('InvalidClient', 'Could not initialize wallet client');
      }
      return client;
    }
  
 
  
    async executeMessage<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<abi, 'pure' | 'view'> = ContractFunctionName<abi, 'pure' | 'view'>,
    args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName> = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
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
      return client.sendTransaction({
        to: args.to,
        value: args.value,
      });
    }
  
    // Batch execution for EVM is not standard, so executeMessageBatch can be left unimplemented or throw
    async executeMessageBatch(): Promise<any> {
      throw new Error('Batch execution is not supported for EVM by default.');
    }
  } 