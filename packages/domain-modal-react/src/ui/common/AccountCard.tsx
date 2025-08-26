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
    <div className='w-full flex flex-wrap gap-1 items-center justify-between px-4 py-3 border border-gray-200 rounded-sm  '>
      <div className='flex items-center space-x-3'>
        {wallet?.logo && (
          <WalletLogo logo={wallet.logo} className={walletLogoClassName} />
        )}
        <div className='flex flex-col'>
          <span className='font-medium text-sm'>
            {wallet?.walletPrettyName ?? 'Wallet'}
          </span>
          <span className='text-xs text-gray-600 font-mono'>
            {address ? shortenAddress(address) : ''}
          </span>
          <span className='text-xs text-gray-500'>
            {capitalize(chainName ?? 'Error: unknown chain name')}
          </span>
        </div>
      </div>
      <button
        onClick={async () => await onDisconnect()}
        className='px-2 py-1  text-xs rounded-sm hover:bg-gray-100 text-gray-700   transition-colors duration-200  md:min-w-24'
      >
        Disconnect
      </button>
    </div>
  );
}
