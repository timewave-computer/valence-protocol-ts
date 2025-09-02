export interface WalletLogoProps {
  logo?: string;
  className?: string;
  showPlaceholder?: boolean;
}

export const WalletLogo = ({
  logo,
  className = '',
  showPlaceholder = true,
}: WalletLogoProps) => {
  if (!logo && showPlaceholder) {
    return (
      <div
        className={`md:w-6 md:h-6 w-8 h-10 rounded-sm bg-gray-400 flex items-center justify-center text-white text-sm font-medium`}
      >
        w
      </div>
    );
  } else if (!logo) {
    return null;
  }
  return (
    <img
      src={logo}
      alt='Wallet Logo'
      className={`rounded-sm h-6 w-6  ${className}`}
    />
  );
};
