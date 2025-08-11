import { MinimalWalletInfo } from '@/hooks/common';

export const WalletLogo = ({ wallet }: { wallet: MinimalWalletInfo }) => {
  return (
    <img
      src={wallet.logo}
      alt={wallet.walletPrettyName}
      className='w-6 h-6 rounded-full'
    />
  );
};
