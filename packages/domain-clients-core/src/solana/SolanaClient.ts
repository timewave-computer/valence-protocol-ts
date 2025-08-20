import { ChainClient } from '@/common';
import { createSolanaClient, type Address, address } from 'gill';
import { Buffer } from 'buffer';
import { AccountDecoder } from '@/solana';

export interface SolanaClientArgs {
  rpcUrl?: string;
}

export class SolanaClient extends ChainClient {
  public readonly rpcUrl: string | undefined;

  constructor(args: SolanaClientArgs) {
    super();
    this.rpcUrl = args.rpcUrl;
  }

  getClient() {
    return createSolanaClient({
      urlOrMoniker: this.rpcUrl ?? 'mainnet',
    });
  }

  async getSolBalance({ address }: { address: Address }) {
    const client = this.getClient();
    const balance = await client.rpc.getBalance(address).send();
    return balance;
  }

  async getTokenBalance({ tokenAddress }: { tokenAddress: Address }) {
    const tokenAccountPubkey = address(tokenAddress);
    const client = this.getClient();
    const balance = await client.rpc
      .getTokenAccountBalance(tokenAccountPubkey)
      .send();
    return balance;
  }

  // reading from a program account
  async queryAccount<T>({
    accountAddress,
    decoder,
  }: {
    accountAddress: Address;
    decoder: AccountDecoder<T>;
  }): Promise<T> {
    const accountPubkey = address(accountAddress);
    const client = this.getClient();
    const response = await client.rpc.getAccountInfo(accountPubkey).send();
    if (!response.value || !response.value.data) {
      throw new Error('Account not found or has no data');
    }
    const data = response.value.data;
    const raw = Buffer.from(data.toString(), 'base64');
    return decoder(raw);
  }
}
