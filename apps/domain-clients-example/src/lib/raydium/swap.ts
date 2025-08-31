import {
  type ComputeBudgetConfig,
  type TxTipConfig,
  MIN_SQRT_PRICE_X64,
  MAX_SQRT_PRICE_X64,
  SqrtPriceMath,
  ClmmInstrument,
  Raydium,
  Clmm,
} from '@raydium-io/raydium-sdk-v2';
import {
  type Address,
  type Instruction,
  address,
  type TransactionSigner,
} from 'gill';
import BN from 'bn.js';
import { Decimal } from 'decimal.js';

import {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
} from 'gill/programs/token';
import { PublicKey } from '@solana/web3.js'; // this is legacy, but this is what the raydium sdk uses as input, so it is required until the library migrates to solana-kit
import { fromLegacyTransactionInstruction } from '@solana/compat';
import { Connection } from '@solana/web3.js'; // used because raydium uses legacy tools

type SwapInParams = {
  poolId: Address;
  inputMint: Address;
  amountIn: bigint;
  amountOutMin: bigint;
  priceLimit: Decimal;
  remainingAccounts?: Address[];
  computeBudgetConfig?: ComputeBudgetConfig; // not used
  txTipConfig?: TxTipConfig; // not used
  signer: TransactionSigner;
  connection: Connection;
};

export const createClmmSwapInInstructions = async ({
  poolId,
  inputMint,
  priceLimit,
  amountIn,
  amountOutMin,
  signer,
  remainingAccounts,
  connection,
}: SwapInParams): Promise<Instruction[]> => {
  const raydium = await Raydium.load({
    connection,
  });

  const clmm = new Clmm({
    scope: raydium,
    moduleName: 'clmm',
  });

  const { poolInfo, poolKeys, computePoolInfo } = await getPoolInfo(
    poolId,
    connection
  );

  const observationId = computePoolInfo.observationId;

  const baseIn = inputMint === poolInfo.mintA.address;
  const signerPubkey = new PublicKey(signer.address);

  let sqrtPriceLimitX64: BN;
  if (!priceLimit || priceLimit.equals(new Decimal(0))) {
    sqrtPriceLimitX64 = baseIn
      ? MIN_SQRT_PRICE_X64.add(new BN(1))
      : MAX_SQRT_PRICE_X64.sub(new BN(1));
  } else {
    sqrtPriceLimitX64 = SqrtPriceMath.priceToSqrtPriceX64(
      priceLimit,
      poolInfo.mintA.decimals,
      poolInfo.mintB.decimals
    );
  }

  const instructions: Instruction[] = [];

  const ownerTokenAccountA = await getAssociatedTokenAccountAddress(
    address(poolInfo.mintA.address),
    signer.address,
    address(poolInfo.mintA.programId)
  );

  const createAssociatedTokenInstructionA =
    getCreateAssociatedTokenIdempotentInstruction({
      mint: address(poolInfo.mintA.address),
      payer: signer,
      tokenProgram: address(poolInfo.mintA.programId),
      owner: address(signer.address),
      ata: address(poolInfo.mintA.address),
    });

  instructions.push(createAssociatedTokenInstructionA);

  const ownerTokenAccountB = await getAssociatedTokenAccountAddress(
    address(poolInfo.mintB.address),
    signer.address,
    address(poolInfo.mintB.programId)
  );

  const createAssociatedTokenInstructionB =
    getCreateAssociatedTokenIdempotentInstruction({
      mint: address(poolInfo.mintB.address),
      payer: signer,
      tokenProgram: address(poolInfo.mintB.programId),
      owner: address(signer.address),
      ata: address(poolInfo.mintB.address),
    });

  instructions.push(createAssociatedTokenInstructionB);

  const swapBaseInInstructions = ClmmInstrument.makeSwapBaseInInstructions({
    poolInfo,
    poolKeys,
    observationId: new PublicKey(observationId),
    ownerInfo: {
      wallet: signerPubkey,
      tokenAccountA: new PublicKey(ownerTokenAccountA),
      tokenAccountB: new PublicKey(ownerTokenAccountB),
    },
    inputMint: new PublicKey(inputMint),
    amountIn,
    amountOutMin,
    sqrtPriceLimitX64,
    remainingAccounts:
      remainingAccounts?.map(account => new PublicKey(account)) ?? [],
  });

  swapBaseInInstructions.instructions.forEach(instruction => {
    instructions.push(fromLegacyTransactionInstruction(instruction));
  });

  // TODO: add customComputeInstruction
  // TODO: addtip instruction
  return instructions;
};

export const getPoolInfo = async (poolId: Address, connection: Connection) => {
  const raydium = await Raydium.load({
    connection,
  });

  const clmm = new Clmm({
    scope: raydium,
    moduleName: 'clmm',
  });

  return clmm.getPoolInfoFromRpc(poolId);
};
