import { microToBase } from '@valence-protocol/domain-clients-core';
import { Label } from '@/components';

interface BalanceViewProps {
  inputAddress: string;
  setInputAddress: (address: string) => void;
  isLoading: boolean;
  isError: boolean;
  decimals: number;
  symbol: string;
  amount?: string;
}

export const BalanceView = ({
  inputAddress,
  setInputAddress,
  isLoading,
  isError,
  decimals,
  symbol,
  amount,
}: BalanceViewProps) => {
  return (
    <>
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
          {microToBase(amount ?? '0', decimals)} {symbol}
        </p>
        {isLoading && <p className='text-xs'>Loading...</p>}
        {isError && <p className='text-xs text-red-500'>Error</p>}
      </div>
    </>
  );
};
