import {
  SolanaBaseClient,
  type SolanaBaseClientArgs,
  type TokenProgramId,
} from '@/solana';
import {
  Address,
  Instruction,
  TransactionSigner,
  address,
  createTransaction,
  signTransactionMessageWithSigners,
  type TransactionVersion,
} from 'gill';
import {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
  getTransferInstruction,
  getTransferSolInstruction,
  TOKEN_PROGRAM_ADDRESS,
} from 'gill/programs';

export type SigningSolanaClientArgs = SolanaBaseClientArgs & {
  signer: TransactionSigner;
};

export class SigningSolanaClient extends SolanaBaseClient {
  public readonly signer: TransactionSigner;

  constructor(args: SigningSolanaClientArgs) {
    super(args);
    this.signer = args.signer;
  }

  async transferSol({
    toAddress,
    amount,
    version = 'legacy',
  }: {
    toAddress: Address;
    amount: bigint;
    version?: TransactionVersion;
  }): Promise<any> {
    const instructions = [
      getTransferSolInstruction({
        source: this.signer,
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
    tokenProgram: TokenProgramId;
    version?: TransactionVersion;
  }) {
    const destination = address(toAddress);
    const destinationAta = await getAssociatedTokenAccountAddress(
      tokenMintAddress,
      destination,
      tokenProgram
    );
    const sourceAta = await getAssociatedTokenAccountAddress(
      tokenMintAddress,
      this.signer,
      tokenProgram
    );

    const instructions = [
      // create idempotent will gracefully fail if the ata already exists. this is the gold standard!
      getCreateAssociatedTokenIdempotentInstruction({
        mint: tokenMintAddress,
        payer: this.signer,
        tokenProgram,
        owner: toAddress,
        ata: toAddress,
      }),
      getTransferInstruction({
        source: sourceAta,
        authority: this.signer,
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
      feePayer: this.signer,
      instructions,
    });

    const signedTx = await signTransactionMessageWithSigners(tx);
    const response = await client.sendAndConfirmTransaction(signedTx);
    return response;
  }
}
