'use client';

import { useAtom } from 'jotai';
import { SelectWalletButton, AccountCard } from '@/ui/common';
import { useCosmosConnectors, cosmosWalletAtom } from '@/hooks';
import { useAccount, disconnect, WalletType } from 'graz';
import { useCosmosConfig } from '@valence-protocol/domain-clients-react';
import { cn } from '@/ui/util';

export interface CosmosConnectionManagerProps {
  config: ReturnType<typeof useCosmosConfig>;
}
export const CosmosConnectionManager = ({
  config,
}: CosmosConnectionManagerProps) => {
  const cosmosConnectors = useCosmosConnectors();
  const [cosmosWallet] = useAtom(cosmosWalletAtom);

  const { data: accounts, isConnected } = useAccount({
    multiChain: true,
  });

  if (isConnected) {
    return (
      <>
        {config.grazOptions.chains.map(chainInfo => {
          const chainId = chainInfo.chainId;
          const account = accounts?.[chainId];
          if (account) {
            return (
              <AccountCard
                key={chainId}
                wallet={cosmosWallet?.walletInfo}
                address={account.bech32Address}
                chainName={chainInfo.chainName}
                onDisconnect={async () => disconnect({ chainId })}
              />
            );
          }
        })}
      </>
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
              onConnect={() => connector.connect(config.defaultChainId)}
            />
          );
        })}
      </div>
    );
};

const walletLogoScale = (walletName: string) => {
  // some logos have transparent backgrounds, need to scale them up
  // permanent fix is to change the cosmos
  return {
    Keplr: 'scale-[1.3]',
    Leap: 'scale-[1.3]',
  }[walletName];
};
