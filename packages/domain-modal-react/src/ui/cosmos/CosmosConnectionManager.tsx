'use client';

import { useAtomValue } from 'jotai';
import { SelectWalletButton, AccountCard } from '@/ui/common';
import { useCosmosConnectors, cosmosWalletAtom } from '@/hooks';
import { useAccount, disconnect } from 'graz';
import { useCosmosConfig } from '@valence-protocol/domain-clients-react';
import { cn } from '@/ui/util';
import { useDomainModal, getCosmosTargetChain } from '@/ui/context';

export const CosmosConnectionManager = () => {
  const cosmosConnectors = useCosmosConnectors();
  const cosmosWallet = useAtomValue(cosmosWalletAtom);
  const config = useCosmosConfig();
  const { targetChains } = useDomainModal();
  const chainIdToConnect =
    getCosmosTargetChain(targetChains) ?? config.defaultChainId;

  const { data: accounts, isConnected } = useAccount({
    multiChain: true,
  });

  if (!config) {
    console.warn(
      'Attempted to use CosmosConnectionManager with undefined cosmosconfig'
    );
    return null;
  }

  if (isConnected) {
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
  } else
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
              onConnect={() => connector.connect(chainIdToConnect)}
            />
          );
        })}
      </div>
    );
};

const walletLogoScale = (walletName: string) => {
  // some logos have transparent backgrounds, need to scale them up
  // permanent fix is to change the logo assets in getCosmosWalletInfo
  return {
    Keplr: 'scale-[1.3]',
    Leap: 'scale-[1.3]',
  }[walletName];
};
