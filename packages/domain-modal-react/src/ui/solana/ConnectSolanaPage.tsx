'use client';

import { useIsSolanaChainConnected } from '@/hooks';
import { ConnectDomainPageRoot } from '@/ui/main';
import { SolanaConnectors, SolanaConnection } from '@/ui/solana';

export const ConnectSolanaPage = ({ onBack }: { onBack?: () => void }) => {
  const isSolanaConnected = useIsSolanaChainConnected();
  return (
    <ConnectDomainPageRoot
      title={`${isSolanaConnected ? 'Solana Wallet' : 'Select Solana Wallet'}`}
      onBack={onBack}
    >
      {isSolanaConnected ? (
        <SolanaConnection />
      ) : (
        <SolanaConnectors onSuccess={onBack} />
      )}
    </ConnectDomainPageRoot>
  );
};
