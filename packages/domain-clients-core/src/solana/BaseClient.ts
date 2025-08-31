import { Blockhash, createSolanaClient } from 'gill';

export interface SolanaBaseClientArgs {
  rpcUrl: string;
}

export abstract class SolanaBaseClient {
  public readonly rpcUrl: string;

  constructor(args: SolanaBaseClientArgs) {
    this.rpcUrl = args.rpcUrl;
  }

  public getClient() {
    return createSolanaClient({
      urlOrMoniker: this.rpcUrl,
    });
  }

  public async queryLatestBlockHash() {
    const client = this.getClient();

    const response = await client.rpc.getLatestBlockhash().send();
    return response.value;
  }

  public getRpcUrl() {
    return this.rpcUrl;
  }
}
