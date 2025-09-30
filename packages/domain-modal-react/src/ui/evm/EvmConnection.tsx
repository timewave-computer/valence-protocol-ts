'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtomValue } from 'jotai';
import { evmWalletAtom } from '@/hooks';
import { AccountCard, ConnectionRoot } from '@/ui/common';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { getDomainCount } from '@/index';

export const EvmConnection = () => {
  const evmWallet = useAtomValue(evmWalletAtom);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const config = useDomainConfig();
  const domainDisplayCount = getDomainCount(config);

  const isConnected = account?.status === 'connected';

  if (!config.evm) {
    throw new Error(
      'Attempting to use EvmConnectionManager with undefined evmconfig'
    );
  }

  if (!isConnected || !account) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot
      // only show title if there are multiple domains displayed
      title={domainDisplayCount > 1 ? 'Ethereum Wallet' : undefined}
    >
      <AccountCard
        wallet={evmWallet?.walletInfo}
        address={account.address}
        chainName={account.chain?.name}
        onDisconnect={async () => disconnect()}
      />
    </ConnectionRoot>
  );
};
