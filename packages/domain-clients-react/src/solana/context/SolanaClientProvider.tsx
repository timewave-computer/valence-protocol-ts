'use client';
import { WalletUi } from '@wallet-ui/react';
import { useDomainConfig } from '@/common';
import { WalletProvider } from '@solana/wallet-adapter-react';

export const SolanaClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const config = useDomainConfig();

  if (!config.solana) {
    return children;
  }
  const wallets: any[] = [];
  return (
    <WalletUi config={config.solana}>
      <WalletProvider wallets={wallets}>{children}</WalletProvider>
    </WalletUi>
  );
};
