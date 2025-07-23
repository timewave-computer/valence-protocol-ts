export abstract class SigningChainClient {
    public readonly gas: number;
    public readonly senderAddress: string;
    public readonly chainId: string;
    public readonly rpcUrl: string;
  
    constructor(
      chainId: string,
      rpcUrl: string,
      gas: number,
      senderAddress: string
    ) {
      this.chainId = chainId;
      this.rpcUrl = rpcUrl;
      this.gas = gas;
      this.senderAddress = senderAddress;
    }
  
    // Pre-constructed methods
    abstract sendTokens(...args: unknown[]): Promise<unknown>;
  
    // Raw operations
    abstract executeMessage(...args: unknown[]): Promise<unknown>;
    abstract executeMessageBatch(...args: unknown[]): Promise<unknown>;
  } 