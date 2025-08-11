export abstract class SigningChainClient {

    // Pre-constructed methods
    abstract sendTokens(...args: unknown[]): Promise<unknown>;
  
    // Raw operations
    abstract executeMessage(...args: unknown[]): Promise<unknown>;
    abstract executeMessageBatch(...args: unknown[]): Promise<unknown>;
  } 