'use client';

import { useIsCosmosChainConnected } from '@/hooks';
import { SelectDomainButton } from '@/ui/common';
import { CosmosConnection } from '@/ui/cosmos';

export const CosmosMainSection = ({ onClick }: { onClick: () => void }) => {
  const isCosmosConnected = useIsCosmosChainConnected();

  if (!isCosmosConnected) {
    return (
      <SelectDomainButton onClick={onClick}>
        Connect Cosmos Wallet
      </SelectDomainButton>
    );
  }

  return (
    <div>
      <h2>Cosmos Wallet</h2>
      <CosmosConnection />
    </div>
  );
};
