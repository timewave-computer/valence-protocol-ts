import { WalletLogo } from '@/ui/common';
import { EvmConnector, CosmosConnector } from '@/hooks';

interface SelectWalletButtonProps {
  wallet: CosmosConnector | EvmConnector;
  walletLogoClassName?: string;
  onConnect: (chainId: number | string) => Promise<void>;
}

export const SelectWalletButton = ({
  wallet,
  onConnect,
  walletLogoClassName,
}: SelectWalletButtonProps) => {
  return (
    <button
      onClick={() => onConnect(wallet.chainType)}
      disabled={!wallet.isAvailable}
      className='w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
    >
      <div className='flex items-center space-x-3'>
        <WalletLogo
          className={walletLogoClassName}
          logo={wallet.walletInfo.logo}
        />
        <span className='font-medium'>
          {wallet.walletInfo.walletPrettyName}
        </span>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded ${
          wallet.isAvailable
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {wallet.isAvailable ? 'Installed' : 'Not Installed'}
      </span>
    </button>
  );
};
