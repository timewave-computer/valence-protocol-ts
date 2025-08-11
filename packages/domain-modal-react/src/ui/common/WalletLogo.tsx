export interface WalletLogoProps {
  logo?: string;
}

export const WalletLogo = ({ logo }: WalletLogoProps) => {
  if (!logo) {
    return (
      <div className='w-6 h-6 rounded-sm bg-gray-400 flex items-center justify-center text-white text-sm font-medium'>
        w
      </div>
    );
  }

  return <img src={logo} alt='Wallet Logo' className='w-6 h-6 rounded-sm' />;
};
