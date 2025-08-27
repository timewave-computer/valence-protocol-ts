'use client';

import { Button, Input, Label } from '@/components/ui';
import { useCallback, useState } from 'react';
import { parseUnits } from 'viem';
import {
  useSigningEvmClient,
  useEvmClient,
} from '@valence-protocol/domain-clients-react/evm';
import { useMutation } from '@tanstack/react-query';
import { useSwitchChain } from 'wagmi';
import { useIsEvmChainConnected } from '@valence-protocol/domain-modal-react';

type EthereumNativeTransferProps = {
  chainId: number;
};

const sepoliaEthDecimals = 18;

export const EthereumNativeTransfer = ({
  chainId,
}: EthereumNativeTransferProps) => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { switchChain } = useSwitchChain();
  const isChainConnected = useIsEvmChainConnected(chainId);

  const signingEvmClient = useSigningEvmClient(chainId);
  const publicEvmClient = useEvmClient(chainId);

  const onSubmit = useCallback(async () => {
    switchChain({ chainId: chainId });
    if (!signingEvmClient || !publicEvmClient) {
      throw new Error('EVM client not found');
    }
    const amountInWei = parseUnits(amount, sepoliaEthDecimals);

    const tx = await signingEvmClient.sendTokens({
      to: toAddress as `0x${string}`,
      value: amountInWei,
    });
    const txHash = await publicEvmClient.waitForTransactionReceipt({
      txHash: tx,
    });
    if (txHash.status === 'success') {
      return txHash;
    }
    throw new Error('Transaction failed');
  }, [
    amount,
    toAddress,
    signingEvmClient,
    publicEvmClient,
    chainId,
    switchChain,
  ]);

  const {
    mutate: sendTokens,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: onSubmit,
    onError: error => {
      console.error('Transaction failed', error);
    },
  });

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col'>
        <Label htmlFor='amount'>Amount SepoliaETH</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs max-w-[400px]'
          placeholder='Enter amount'
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='toAddress'>Recipient Address</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs max-w-[400px]'
          placeholder='Enter address'
          type='text'
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-2 items-center'>
        <Button disabled={!isChainConnected} onClick={() => sendTokens()}>
          <span>Transfer</span>
        </Button>
        {!isChainConnected && (
          <p className='text-xs text-gray-500'>
            Connect to Sepolia to transfer tokens
          </p>
        )}
      </div>
      {isError && (
        <div className='text-xs text-red-500'>Transaction failed</div>
      )}
      {isPending && (
        <div className='text-xs text-gray-500'>Transaction pending</div>
      )}
      {isSuccess && (
        <div className='text-xs text-green-500'>Transaction successful</div>
      )}
    </div>
  );
};
