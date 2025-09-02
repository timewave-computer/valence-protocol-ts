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
    <div className='w-full flex flex-wrap gap-1 items-center justify-between px-4 py-0.5 '>
      <div className='flex items-center space-x-3'>
        {wallet?.logo && (
          <WalletLogo logo={wallet.logo} className={walletLogoClassName} />
        )}
        <div className='flex flex-col'>
          <span className='text-sm text-gray-900'>
            {capitalize(chainName ?? 'Error: unknown chain name')}
          </span>
          <span className='text-xs font-mono font-light text-gray-900'>
            {address ? shortenAddress(address) : ''}
          </span>
        </div>
      </div>
      <button
        onClick={async () => await onDisconnect()}
        className='px-2 py-1 font-semibold  text-sm rounded-sm hover:bg-gray-100   transition-colors duration-200  md:min-w-24'
      >
        Disconnect
      </button>
    </div>
  );
}
