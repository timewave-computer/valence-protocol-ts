'use client';
import { microToBase } from '@valence-protocol/domain-clients-core';
import { Label } from '@/components';
import { useState } from 'react';

export const BalanceView = ({
  balance,
  decimals,
  address,
  symbol,
}: {
  balance: string;
  decimals: number;
  address: string;
  symbol: string;
}) => {
  const [inputAddress, setInputAddress] = useState(address);
  return (
    <div className='flex flex-col gap-2 w-1/2'>
      <h2 className='font-semibold'>Neutron</h2>

      <div className='flex flex-col'>
        <Label htmlFor='address'>Address</Label>
        <input
          className='border border-gray-300 rounded-sm p-1 font-mono text-xs'
          placeholder='Enter address'
          type='text'
          value={inputAddress}
          onChange={e => setInputAddress(e.target.value)}
        />
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='balance'>Balance</Label>
        <p className='text-sm  font-mono'>
          {microToBase(balance, decimals)} {symbol}
        </p>
      </div>
    </div>
  );
};
