import { type Address, address } from 'gill';
import {
  getAssociatedTokenAccountAddress,
  TOKEN_PROGRAM_ADDRESS,
} from 'gill/programs/token';
import { SolanaBaseClient, type SolanaBaseClientArgs } from './BaseClient'; // direct import to avoid circular dependency

export class SolanaClient extends SolanaBaseClient {
  constructor(args: SolanaBaseClientArgs) {
    super(args);
  }

  async querySolBalance({ address }: { address: Address }) {
    const client = this.getClient();
    const balance = await client.rpc.getBalance(address).send();
    return balance;
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
