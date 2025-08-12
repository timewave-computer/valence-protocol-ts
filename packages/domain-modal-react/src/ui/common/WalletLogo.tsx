export interface WalletLogoProps {
  logo?: string;
  className?: string;
}

export const WalletLogo = ({ logo, className = '' }: WalletLogoProps) => {
  if (!logo) {
    return (
      <div
        className={`w-5 h-5 rounded-sm bg-gray-400 flex items-center justify-center text-white text-sm font-medium`}
      >
        w
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt='Wallet Logo'
      className={`rounded-sm h-5 w-5  ${className}`}
    />
  );
};
