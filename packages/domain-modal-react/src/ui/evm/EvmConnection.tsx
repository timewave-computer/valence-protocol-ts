'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtomValue } from 'jotai';
import { evmWalletAtom } from '@/hooks';
import { AccountCard, ConnectionRoot } from '@/ui/common';
import { useEvmConfig } from '@valence-protocol/domain-clients-react';

export const EvmConnection = () => {
  const evmWallet = useAtomValue(evmWalletAtom);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const config = useEvmConfig();
  const isConnected = account?.status === 'connected';

  if (!config) {
    throw new Error(
      'Attempting to use EvmConnectionManager with undefined evmconfig'
    );
  }

  if (!isConnected || !account) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot title='Ethereum Wallet'>
      <AccountCard
        wallet={evmWallet?.walletInfo}
        address={account.address}
        chainName={account.chain?.name}
        onDisconnect={async () => disconnect()}
      />
    </ConnectionRoot>
  );
};
