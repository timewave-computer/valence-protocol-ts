export abstract class ChainClient {
  public readonly chainId: string;
  public readonly rpcUrl: string;

  constructor(chainId: string, rpcUrl: string) {
    this.chainId = chainId;
    this.rpcUrl = rpcUrl;
  }

  // Raw operations
  abstract queryContract(...args: unknown[]): Promise<unknown>;
}