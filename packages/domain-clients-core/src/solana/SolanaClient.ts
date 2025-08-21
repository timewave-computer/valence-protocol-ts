import {
  createSolanaClient,
  type Address,
  address,
  type SolanaClusterMoniker,
} from 'gill';
import {
  getAssociatedTokenAccountAddress,
  TOKEN_PROGRAM_ADDRESS,
} from 'gill/programs/token';
import { SolanaBaseClient } from '@/solana';

export interface SolanaClientArgs {
  rpcUrlOrMoniker: SolanaClusterMoniker | string;
}

export class SolanaClient implements SolanaBaseClient {
  public readonly rpcUrl: SolanaClusterMoniker | string;

  constructor(args: SolanaClientArgs) {
    this.rpcUrl = args.rpcUrlOrMoniker;
  }

  getClient() {
    return createSolanaClient({
      urlOrMoniker: this.rpcUrl,
    });
  }

  async querySolBalance({ address }: { address: Address }) {
    const client = this.getClient();
    const balance = await client.rpc.getBalance(address).send();
    return balance;
  }

  async queryLatestBlockHash(): Promise<string> {
    const client = this.getClient();
    const blockhash = await client.rpc.getLatestBlockhash().send();
    return blockhash.value.blockhash.toString();
  }

  async queryTokenBalance({
    tokenMintAddress,
    userAddress,
    tokenProgram,
  }: {
    tokenMintAddress: Address;
    userAddress: Address;
    tokenProgram?: Address;
  }) {
    const tokenAccountPubkey = address(tokenMintAddress);
    const userAccountPubkey = address(userAddress);

    const ata = await getAssociatedTokenAccountAddress(
      tokenAccountPubkey,
      userAccountPubkey,
      tokenProgram ?? TOKEN_PROGRAM_ADDRESS
    );
    const client = this.getClient();
    const balance = await client.rpc.getTokenAccountBalance(ata).send();
    if (!balance.value) {
      throw new Error('Token account not found');
    }
    return balance.value.amount;
  }
}
