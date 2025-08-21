import { ChainClient } from '@/common';

export interface SigningSolanaClientArgs {}

export class SigningSolanaClient extends ChainClient {
  constructor(args: SigningSolanaClientArgs) {
    super();
  }
}
