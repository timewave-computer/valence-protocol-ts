'use client';

import { useIsSolanaConnected } from '@/hooks';
import { ConnectDomainButton } from '@/ui/common';
import { SolanaConnection } from '@/ui/solana';

export const SolanaMainSection = ({ onClick }: { onClick: () => void }) => {
  const isSolanaConnected = useIsSolanaConnected();

  if (!isSolanaConnected) {
    return (
      <ConnectDomainButton onClick={onClick}>
        Connect Solana Wallet
      </ConnectDomainButton>
    );
  }

  return (
    <div>
      <h2>Solana Wallet</h2>
      <SolanaConnection />
    </div>
  );
};
