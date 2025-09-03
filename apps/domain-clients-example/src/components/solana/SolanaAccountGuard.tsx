'use client';
import { useWalletUiAccount } from '@wallet-ui/react';

// this is a workaround for behavior of the the solana wallet library
// it will ensure the useSigningSolanaClient hook is only instantiated if there is an account connected
// once fixed, this component can be removed and useSigningSolanaClient can be instantiated safely without a wallet connected
export const SolanaAccountGuard = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  const { account } = useWalletUiAccount();

  if (!account) {
    return fallback;
  }

  return <>{children}</>;
};
