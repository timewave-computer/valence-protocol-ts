import { ChainClient } from '@/common';

export interface SolanaClientArgs {
  rpcUrl: string;
}

export class SolanaClient extends ChainClient {
  public readonly rpcUrl: string;
  constructor(args: SolanaClientArgs) {
    super();
    this.rpcUrl = args.rpcUrl;
  }

  async queryContract() {
    return {};
  }
}
