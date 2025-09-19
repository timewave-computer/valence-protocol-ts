import {
  SolanaBaseClient,
  type SolanaBaseClientArgs,
  type SolanaTokenProgramId,
} from '@/solana';
import { Adapter } from '@solana/wallet-adapter-base';
import {
  Address,
  Instruction,
  TransactionSigner,
  address,
  createTransaction,
  type TransactionVersion,
  type Signature,
} from 'gill';
import {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
  getTransferInstruction,
  getTransferSolInstruction,
  TOKEN_PROGRAM_ADDRESS,
} from 'gill/programs';

export type SigningSolanaClientArgs = SolanaBaseClientArgs & {
  adapter: Adapter;
};

export class SigningSolanaClient extends SolanaBaseClient {
  public readonly adapter: Adapter;
  public readonly publicKey: string;

  constructor(args: SigningSolanaClientArgs) {
    super(args);
    this.adapter = args.adapter;
    if (!args.adapter.publicKey) {
      throw new Error('Public key is required');
    }
    this.publicKey = args.adapter.publicKey.toString();
  }

  async transferSol({
    toAddress,
    amount,
    version = 'legacy',
  }: {
    toAddress: Address;
    amount: bigint;
    version?: TransactionVersion;
  }): Promise<Signature> {
    const instructions = [
      getTransferSolInstruction({
        source: address(this.publicKey),
        destination: toAddress,
        amount,
      }),
    ];

    return this.executeInstructions({
      instructions,
      version,
    });
  }

  async transferToken({
    toAddress,
    amount,
    tokenMintAddress,
    tokenProgram = TOKEN_PROGRAM_ADDRESS,
    version = 'legacy',
  }: {
    toAddress: Address;
    tokenMintAddress: Address;
    amount: bigint;
    tokenProgram?: SolanaTokenProgramId;
    version?: TransactionVersion;
  }) {
    const destination = address(toAddress);
    const destinationAta = await getAssociatedTokenAccountAddress(
      tokenMintAddress,
      destination,
      tokenProgram
    );
    const sourceAddress = address(this.publicKey);

    const sourceAta = await getAssociatedTokenAccountAddress(
      tokenMintAddress,
      this.publicKey,
      tokenProgram
    );

    const instructions = [
      // create idempotent will gracefully fail if the ata already exists. this is the gold standard!
      getCreateAssociatedTokenIdempotentInstruction({
        mint: tokenMintAddress,
        payer: this.publicKey,
        tokenProgram,
        owner: sourceAddress,
        ata: sourceAta,
      }),
      getTransferInstruction({
        source: sourceAta,
        authority: this.publicKey,
        destination: destinationAta,
        amount: amount,
      }),
    ];

    return this.executeInstructions({
      instructions,
      version,
    });
  }

  async executeInstructions({
    instructions,
    version = 'legacy',
  }: {
    instructions: Instruction[];
    version?: TransactionVersion;
  }) {
    const latestBlockhash = await this.queryLatestBlockHash();
    const client = this.getClient();

    const tx = createTransaction({
      latestBlockhash,
      version: version,
      feePayer: this.publicKey,
      instructions,
    });

    const signedTx = await signTransactionMessageWithSigners(tx);
    const response = await client.sendAndConfirmTransaction(signedTx);
    return response;
  }
}
