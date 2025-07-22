export abstract class ChainClient {
  public readonly chainId: string;
  public readonly rpcUrl: string;

  constructor(chainId: string, rpcUrl: string) {
    this.chainId = chainId;
    this.rpcUrl = rpcUrl;
  }

  // Pre-constructed query methods
  abstract getBalance(...args: any[]): Promise<any>;

  // Raw operations
  abstract queryContract(...args: any[]): Promise<any>;
}

export abstract class SigningChainClient extends ChainClient {
  public readonly gas: number;
  public readonly signer: any;
  public readonly senderAddress: string;

  constructor(
    chainId: string,
    rpcUrl: string,
    gas: number,
    signer: any,
    senderAddress: string
  ) {
    super(chainId, rpcUrl);
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