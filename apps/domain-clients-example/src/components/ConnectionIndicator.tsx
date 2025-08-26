'use client';
import { shortenAddress } from '@valence-protocol/domain-modal-react';
import { cn } from '@/components/ui';

export const ConnectionIndicator = ({
  logo,
  address,
}: {
  logo?: string;
  address: string;
}) => {
  return (
    <div className='flex flex-row items-center gap-1'>
      <WalletLogo logo={logo} />
      <p className='text-xs text-gray-900 font-mono'>
        {shortenAddress(address)}
      </p>
    </div>
  );
};

export const WalletLogo = ({
  logo,
  className = '',
}: {
  logo?: string;
  className?: string;
}) => {
  if (!logo) {
    return (
      <div className='w-4 h-4 rounded-sm bg-gray-400 flex items-center justify-center text-white text-xs font-medium'>
        w
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt='Wallet Logo'
      className={cn('rounded-sm h-4 w-4 ', className)}
    />
  );
};
