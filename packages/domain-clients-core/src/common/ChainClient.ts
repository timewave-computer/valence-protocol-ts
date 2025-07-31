export abstract class ChainClient {

  // Raw operations
  abstract queryContract(...args: unknown[]): Promise<unknown>;
}