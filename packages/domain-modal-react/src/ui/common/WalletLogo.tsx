export interface WalletLogoProps {
  logo?: string;
  className?: string;
}

export const WalletLogo = ({ logo, className = '' }: WalletLogoProps) => {
  if (!logo) {
    return (
      <div
        className={`md:w-5 md:h-5 w-4 h-4 rounded-sm bg-gray-400 flex items-center justify-center text-white text-sm font-medium`}
      >
        w
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt='Wallet Logo'
      className={`rounded-sm md:h-5 md:w-5 h-4 w-4  ${className}`}
    />
  );
};
