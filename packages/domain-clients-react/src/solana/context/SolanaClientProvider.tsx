import { WalletUi } from '@wallet-ui/react';
import { useSolanaConfig } from '@/solana/hooks';

export const SolanaClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const config = useSolanaConfig();
  return <WalletUi config={config}>{children}</WalletUi>;
};
