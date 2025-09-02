import { WalletLogo } from '@/ui/common';
import {
  type EvmConnector,
  type CosmosConnector,
  type SolanaConnector,
} from '@/hooks';
import { cn } from '@/ui/util';

interface SelectWalletButtonProps {
  wallet: CosmosConnector | EvmConnector | SolanaConnector;
  walletLogoClassName?: string;
  onConnect: (args?: unknown) => Promise<void>;
  children?: React.ReactNode;
  className?: string;
}

export const SelectWalletButton = ({
  wallet,
  onConnect,
  walletLogoClassName,
  children,
  className,
}: SelectWalletButtonProps) => {
  return (
    <button
      onClick={onConnect}
      disabled={!wallet.isAvailable}
      className={cn(
        'w-full flex flex-col gap-2 items-start justify-center px-4 py-3 rounded-sm bg-gray-100 hover:bg-gray-200  transition-colors duration-200',
        className
      )}
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
      {children}
    </button>
  );
};
