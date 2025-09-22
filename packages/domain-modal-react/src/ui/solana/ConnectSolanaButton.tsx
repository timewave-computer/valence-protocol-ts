import { ConnectDomainButtonRoot } from '@/ui/common';
import { useIsSolanaChainConnected } from '@/hooks';

export const ConnectSolanaButton = ({ onClick }: { onClick: () => void }) => {
  const isSolanaConnected = useIsSolanaChainConnected();
  if (isSolanaConnected) {
    return undefined;
  }
  return (
    <ConnectDomainButtonRoot onClick={onClick}>
      Connect Solana
    </ConnectDomainButtonRoot>
  );
};
