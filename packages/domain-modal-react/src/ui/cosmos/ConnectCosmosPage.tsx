'use client';

import { ConnectDomainPageRoot } from '@/ui/main';
import { CosmosConnection, CosmosConnectors } from '@/ui/cosmos';
import { useIsCosmosChainConnected } from '@/hooks';

export const ConnectCosmosPage = ({ onBack }: { onBack: () => void }) => {
  const isCosmosConnected = useIsCosmosChainConnected();
  return (
    <ConnectDomainPageRoot title='Select Cosmos Wallet' onBack={onBack}>
      {isCosmosConnected ? (
        <CosmosConnection />
      ) : (
        <CosmosConnectors onSuccess={onBack} />
      )}
    </ConnectDomainPageRoot>
  );
};
