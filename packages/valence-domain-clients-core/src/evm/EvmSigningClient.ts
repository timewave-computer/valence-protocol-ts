import { getWalletClient } from '@wagmi/core';
import { Abi, Address, ContractFunctionArgs, ContractFunctionName, SendTransactionReturnType, WriteContractParameters, WriteContractReturnType, WalletClient, isAddress } from 'viem';

import { SigningChainClient, ClientErrorType, throwClientError } from '@/common';
import { EvmConfig } from '@/evm';


export class EvmSigningClient extends SigningChainClient {
  public readonly config: EvmConfig;
  
    constructor(
      chainId: string,
      rpcUrl: string,
      gas: number,
      signer: any, // WalletClient or similar
      senderAddress: Address,
      config: EvmConfig
    ) {
      super(chainId, rpcUrl, gas, signer, senderAddress);
      this.config = config;

    }
  
    // EVM specific
    async getWalletClient(): Promise<WalletClient> {
  
      const client = await getWalletClient(this.config);
      if (!client) {
        throwClientError(ClientErrorType.InvalidClient, 'Could not initialize wallet client');
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
      const client = await this.getWalletClient()
      
      if (!isAddress(this.senderAddress)) {
        throwClientError(ClientErrorType.InvalidAddress, 'Sender address is not set');
      }
      if (!isAddress(args.to)) {
        throwClientError(ClientErrorType.InvalidAddress, 'Recipient address is not set');
      }
     
      return client.sendTransaction({
        account: this.senderAddress,
        to: args.to,
        value: args.value,
        chain: null,
      });
    }
  
    // Batch execution for EVM is not standard, so executeMessageBatch can be left unimplemented or throw
    async executeMessageBatch(): Promise<any> {
      throw new Error('Batch execution is not supported for EVM by default.');
    }
  } 