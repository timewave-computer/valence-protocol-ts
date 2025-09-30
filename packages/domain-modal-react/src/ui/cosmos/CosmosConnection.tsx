'use client';

import { useAtomValue } from 'jotai';
import { AccountCard, ConnectionRoot } from '@/ui/common';
import { cosmosWalletAtom } from '@/hooks';
import { useAccount, disconnect } from 'graz';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { cn, getDomainCount } from '@/ui/util';
import { walletLogoScale } from '@/ui/cosmos';

export const CosmosConnection = () => {
  const cosmosWallet = useAtomValue(cosmosWalletAtom);
  const config = useDomainConfig();
  const domainDisplayCount = getDomainCount(config);

  const { data: accounts, isConnected } = useAccount({
    multiChain: true,
  });

  if (!config.cosmos) {
    throw new Error(
      'Attempted to use CosmosConnectionManager with undefined cosmosconfig'
    );
  }

  if (!isConnected) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot
      title={domainDisplayCount < 2 ? undefined : 'Cosmos Wallet'}
    >
      <div className='flex flex-col'>
        {config.cosmos.grazOptions.chains.map(chainInfo => {
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
