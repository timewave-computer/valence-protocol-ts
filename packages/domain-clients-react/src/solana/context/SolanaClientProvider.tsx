import { WalletUi } from '@wallet-ui/react';
import { useDomainConfig } from '@/common';

export const SolanaClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const config = useDomainConfig();

  if (!config.solana) {
    return children;
  }
  return <WalletUi config={config.solana}>{children}</WalletUi>;
};
