'use client';

import { useAtomValue } from 'jotai';
import { AccountCard } from '@/ui/common';
import { cosmosWalletAtom } from '@/hooks';
import { useAccount, disconnect } from 'graz';
import { useCosmosConfig } from '@valence-protocol/domain-clients-react';
import { cn } from '@/ui/util';
import { walletLogoScale } from '@/ui/cosmos';

export const CosmosConnection = () => {
  const cosmosWallet = useAtomValue(cosmosWalletAtom);
  const config = useCosmosConfig();

  const { data: accounts, isConnected } = useAccount({
    multiChain: true,
  });

  if (!config) {
    throw new Error(
      'Attempted to use CosmosConnectionManager with undefined cosmosconfig'
    );
  }

  if (!isConnected) {
    throw new Error(
      'CosmosConnection component should only be used when the user is connected to a cosmos wallet'
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {config.grazOptions.chains.map(chainInfo => {
        const chainId = chainInfo.chainId;
        const account = accounts?.[chainId];
        if (account) {
          return (
            <AccountCard
              walletLogoClassName={cn(
                walletLogoScale(cosmosWallet?.walletInfo?.walletName ?? '')
              )}
              key={chainId}
              wallet={cosmosWallet?.walletInfo}
              address={account.bech32Address}
              chainName={chainInfo.chainName}
              onDisconnect={async () => disconnect({ chainId })}
            />
          );
        }
      })}
    </div>
  );
};
