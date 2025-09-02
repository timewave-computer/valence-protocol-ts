'use client';

import { SelectWalletButton } from '@/ui/common';
import { useCosmosConnectors } from '@/hooks';
import { useCosmosConfig } from '@valence-protocol/domain-clients-react';
import { cn } from '@/ui/util';
import { useDomainModal, getCosmosTargetChain } from '@/ui/context';
import { walletLogoScale } from '@/ui/cosmos';

export const CosmosConnectors = ({ onSuccess }: { onSuccess: () => void }) => {
  const cosmosConnectors = useCosmosConnectors();
  const config = useCosmosConfig();
  const { targetChains } = useDomainModal();
  const chainIdToConnect =
    getCosmosTargetChain(targetChains) ?? config.defaultChainId;

  if (!config) {
    throw new Error(
      'Attempted to use CosmosConnectionManager with undefined cosmosconfig'
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {cosmosConnectors.map(connector => {
        return (
          <SelectWalletButton
            walletLogoClassName={cn(
              walletLogoScale(connector.walletInfo.walletName)
            )}
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={async () => {
              await connector.connect(chainIdToConnect);
              onSuccess();
            }}
          />
        );
      })}
    </div>
  );
};
