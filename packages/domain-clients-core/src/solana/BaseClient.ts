import { ChainClient } from '@/common';

export abstract class SolanaBaseClient extends ChainClient {
  public abstract queryLatestBlockHash(): Promise<string>;
}
