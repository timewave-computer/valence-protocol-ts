import { Blockhash, createSolanaClient, SolanaClusterMoniker } from 'gill';

export interface SolanaBaseClientArgs {
  rpcUrlOrMoniker: SolanaClusterMoniker | string;
}

export class SolanaBaseClient {
  public readonly rpcUrlOrMoniker: SolanaClusterMoniker | string;

  constructor(args: SolanaBaseClientArgs) {
    this.rpcUrlOrMoniker = args.rpcUrlOrMoniker;
  }

  public getClient() {
    return createSolanaClient({
      urlOrMoniker: this.rpcUrlOrMoniker,
    });
  }

  public async queryLatestBlockHash() {
    const client = this.getClient();
    const response = await client.rpc.getLatestBlockhash().send();
    return response.value;
  }
}
