'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtomValue } from 'jotai';
import { evmWalletAtom, useEvmConnectors } from '@/hooks';
import { SelectWalletButton, AccountCard } from '@/ui/common';
import { useEvmConfig } from '@valence-protocol/domain-clients-react';

export const EvmConnectionManager = () => {
  const evmConnectors = useEvmConnectors();
  const evmWallet = useAtomValue(evmWalletAtom);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const config = useEvmConfig();
  const isConnected = account?.status === 'connected';

  if (!config) {
    console.warn(
      'Attempted to use EvmConnectionManager with undefined evmconfig'
    );
    return null;
  }

  if (isConnected && !!account) {
    return (
      <AccountCard
        wallet={evmWallet?.walletInfo}
        address={account.address}
        chainName={account.chain?.name}
        onDisconnect={async () => disconnect()}
      />
    );
  } else
    return (
      <div className='flex flex-col gap-2'>
        {evmConnectors.map(connector => (
          <SelectWalletButton
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={() => connector.connect()}
          />
        ))}
      </div>
    );
};
