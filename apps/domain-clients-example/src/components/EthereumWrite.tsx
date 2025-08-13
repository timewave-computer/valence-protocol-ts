'use client';

import { Button, Input, Label } from '@/components/ui';
import { useState } from 'react';

export const EthereumWrite = () => {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className='flex flex-col gap-2 w-1/2'>
      <h2 className='font-semibold'>Sepolia Write</h2>
      <div className='flex flex-col'>
        <Label htmlFor='amount'>Amount ETH</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter amount'
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='toAddress'>Recipient Address</Label>
        <Input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter address'
          type='text'
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <Button>
          <span>Transfer</span>
        </Button>
      </div>
    </div>
  );
};
