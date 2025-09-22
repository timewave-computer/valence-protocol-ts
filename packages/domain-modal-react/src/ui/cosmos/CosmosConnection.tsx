'use client';

import { useAtomValue } from 'jotai';
import { AccountCard, ConnectionRoot } from '@/ui/common';
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
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot title='Cosmos Wallet'>
      <div className='flex flex-col'>
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
    </ConnectionRoot>
  );
};
