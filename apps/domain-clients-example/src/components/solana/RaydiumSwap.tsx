'use client';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SolanaClusterId } from '@wallet-ui/react';
import { useSigningSolanaClient } from '@valence-protocol/domain-clients-react/solana';
import { createClmmSwapInInstructions, getPoolInfo } from '@/lib';
import { Connection } from '@solana/web3.js'; // used because raydium uses legacy tools
import { solanaSolUsdcConcetratedLiqudityPool } from '@/const';
import { Decimal } from 'decimal.js';
import { address, isAddress } from 'gill';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  Button,
} from '@/components';
import { useIsSolanaConnected } from '@valence-protocol/domain-modal-react';

export const RaydiumSwap = ({ clusterId }: { clusterId: SolanaClusterId }) => {
  const signingSolanaClient = useSigningSolanaClient({ clusterId });

  const [poolId, setPoolId] = useState<string>(
    solanaSolUsdcConcetratedLiqudityPool.address
  );
  const [mintAddress, setMintAddress] = useState<string | undefined>();
  const [amountIn, setAmountIn] = useState<string>('1000000000');
  const [amountOutMin, setAmountOutMin] = useState<string>('1000000000');
  const [priceLimit, setPriceLimit] = useState<string>('1');
  const isSolanaConnected = useIsSolanaConnected({ clusterId });

  const queryPoolInfo = useCallback(async () => {
    if (!signingSolanaClient)
      throw new Error('Signing Solana client not found');
    if (!isAddress(poolId)) throw new Error('Pool ID is not a valid address');
    const connection = new Connection(signingSolanaClient.getRpcUrl());
    return getPoolInfo(poolId, connection);
  }, [poolId, signingSolanaClient]);

  const { data: poolInfo, isLoading: isPoolInfoLoading } = useQuery({
    queryKey: ['poolInfo', poolId],
    queryFn: () => queryPoolInfo(),
    enabled: !!poolId && poolId !== '',
  });

  const onSubmit = useCallback(async () => {
    if (!signingSolanaClient)
      throw new Error('Signing Solana client not found');

    // this is legacy, needed because raydium uses legacy tools
    const connection = new Connection(signingSolanaClient.getRpcUrl());
    if (!mintAddress || !isAddress(mintAddress))
      throw new Error('Invalid mint address');

    const instructions = await createClmmSwapInInstructions({
      poolId: address(poolId),
      inputMint: address(mintAddress),
      amountIn: BigInt(amountIn),
      amountOutMin: BigInt(amountOutMin),
      priceLimit: new Decimal(priceLimit),
      signer: signingSolanaClient.signer,
      connection,
    });

    const tx = await signingSolanaClient.executeInstructions({
      instructions,
    });
    console.log('tx', tx);
  }, [
    signingSolanaClient,
    mintAddress,
    poolId,
    amountIn,
    amountOutMin,
    priceLimit,
  ]);

  return (
    <>
      <div className='flex flex-col'>
        <Label htmlFor='poolId'>Pool Address</Label>
        <Input
          value={poolId}
          onChange={e => setPoolId(e.target.value)}
          type='text'
          placeholder='Enter pool address'
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='mintAddress'>Mint Address</Label>
        <Select
          value={mintAddress}
          onValueChange={value => setMintAddress(value)}
        >
          <SelectTrigger
            placeholder={
              isPoolInfoLoading
                ? 'Loading...'
                : poolInfo?.poolKeys
                  ? 'Select mint address'
                  : 'No pool keys found for pool address'
            }
          >
            {mintAddress}
          </SelectTrigger>
          <SelectContent>
            {' '}
            {poolInfo?.poolKeys && (
              <>
                <SelectItem value={poolInfo.poolKeys.mintA.address}>
                  {poolInfo.poolKeys.mintA.symbol}
                </SelectItem>
                <SelectItem value={poolInfo.poolKeys.mintB.address}>
                  {poolInfo.poolKeys.mintB.symbol}
                </SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='amountIn'>Amount In</Label>
        <Input
          value={amountIn}
          onChange={e => setAmountIn(e.target.value)}
          type='text'
          placeholder='Enter amount in'
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='amountOutMin'>Amount Out Min</Label>
        <Input
          value={amountOutMin}
          onChange={e => setAmountOutMin(e.target.value)}
          type='text'
          placeholder='Enter amount out min'
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='priceLimit'>Price Limit</Label>
        <Input
          value={priceLimit}
          onChange={e => setPriceLimit(e.target.value)}
          type='text'
          placeholder='Enter price limit'
        />
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <Button disabled={!isSolanaConnected} onClick={onSubmit}>
          Submit
        </Button>
        {!isSolanaConnected && (
          <p className='text-xs text-gray-500'>
            Connect to Solana to swap tokens
          </p>
        )}
      </div>
    </>
  );
};
