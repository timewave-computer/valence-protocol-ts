import { ConnectDomainButtonRoot } from '@/ui/common';
import { useIsCosmosChainConnected } from '@/hooks';

export const ConnectCosmosButton = ({ onClick }: { onClick: () => void }) => {
  const isCosmosConnected = useIsCosmosChainConnected();
  if (isCosmosConnected) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }
  return (
    <ConnectDomainButtonRoot onClick={onClick}>
      Connect Cosmos
    </ConnectDomainButtonRoot>
  );
};
