import { MinimalWalletInfo } from '@/hooks';
import { shortenAddress, capitalize } from '@/ui/util';
import { WalletLogo } from '@/ui/common';

export function AccountCard({
  wallet,
  address,
  chainName,
  onDisconnect,
  walletLogoClassName,
}: {
  chainName?: string;
  wallet?: MinimalWalletInfo;
  address?: string;
  onDisconnect: () => Promise<void>;
  walletLogoClassName?: string;
}) {
  return (
    <div className='w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg'>
      <div className='flex items-center space-x-3'>
        {wallet?.logo && (
          <WalletLogo logo={wallet.logo} className={walletLogoClassName} />
        )}
        <div className='flex flex-col'>
          <span className='font-medium'>
            {wallet?.walletPrettyName ?? 'Wallet'}
          </span>
          <span className='text-xs text-gray-600'>
            {address ? shortenAddress(address) : ''}
          </span>
          <span className='text-xs text-gray-500'>
            {capitalize(chainName ?? 'Error: unknown chain name')}
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
