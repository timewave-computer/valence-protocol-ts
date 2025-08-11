import { MinimalWalletInfo } from '@/hooks';
import { shortenAddress } from '@/ui/util';
import { WalletLogo } from '@/ui/common';

export function AccountCard({
  wallet,
  address,
  chainName,
  onDisconnect,
}: {
  chainName?: string;
  wallet?: MinimalWalletInfo;
  address?: string;
  onDisconnect: () => Promise<void>;
}) {
  return (
    <div className='w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg'>
      <div className='flex items-center space-x-3'>
        {wallet?.logo && <WalletLogo logo={wallet.logo} />}
        <div className='flex flex-col'>
          <span className='font-medium'>
            {wallet?.walletPrettyName ?? 'Wallet'}
          </span>
          <span className='text-xs text-gray-600'>
            {address ? shortenAddress(address) : ''}
          </span>
          <span className='text-xs text-gray-500'>
            {chainName ?? 'Unknown chain name'}
          </span>
        </div>
      </div>
      <button
        onClick={async () => await onDisconnect()}
        className='px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50  transition-colors duration-200'
      >
        Disconnect
      </button>
    </div>
  );
}
