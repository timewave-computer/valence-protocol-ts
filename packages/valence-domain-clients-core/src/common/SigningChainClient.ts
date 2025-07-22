
export abstract class SigningChainClient {
    public readonly gas: number;
    public readonly signer: any;
    public readonly senderAddress: string;
    public readonly chainId: string;
    public readonly rpcUrl: string;
  
    constructor(
      chainId: string,
      rpcUrl: string,
      gas: number,
      signer: any,
      senderAddress: string
    ) {
      this.chainId = chainId;
      this.rpcUrl = rpcUrl;
      this.gas = gas;
      this.signer = signer;
      this.senderAddress = senderAddress;
    }
  
    // Pre-constructed methods
    abstract sendTokens(...args: any[]): Promise<any>;
  
    // Raw operations
    abstract executeMessage(...args: any[]): Promise<any>;
    abstract executeMessageBatch(...args: any[]): Promise<any>;
  } 