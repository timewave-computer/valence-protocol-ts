'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtomValue } from 'jotai';
import { evmWalletAtom } from '@/hooks';
import { AccountCard } from '@/ui/common';
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
    throw new Error(
      'EvmConnection component should only be used when the user is connected to an evm wallet'
    );
  }

  return (
    <AccountCard
      wallet={evmWallet?.walletInfo}
      address={account.address}
      chainName={account.chain?.name}
      onDisconnect={async () => disconnect()}
    />
  );
};
