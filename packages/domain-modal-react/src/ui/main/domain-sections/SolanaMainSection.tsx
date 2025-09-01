'use client';

import { useIsSolanaConnected } from '@/hooks';
import { SelectDomainButton } from '@/ui/common';
import { SolanaConnection } from '@/ui/solana';

export const SolanaMainSection = ({ onClick }: { onClick: () => void }) => {
  const isSolanaConnected = useIsSolanaConnected();

  if (!isSolanaConnected) {
    return (
      <SelectDomainButton onClick={onClick}>
        Connect Solana Wallet
      </SelectDomainButton>
    );
  }

  return (
    <div>
      <h2>Solana Wallet</h2>
      <SolanaConnection />
    </div>
  );
};
