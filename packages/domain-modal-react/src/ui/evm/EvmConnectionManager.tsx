'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtom } from 'jotai';
import { evmWalletAtom, useEvmConnectors } from '@/hooks';
import { SelectWalletButton, AccountCard } from '@/ui/common';
import { type useEvmConfig } from '@valence-protocol/domain-clients-react';

export interface EvmConnectionManagerProps {
  config: ReturnType<typeof useEvmConfig>;
}
export const EvmConnectionManager = ({}: EvmConnectionManagerProps) => {
  const evmConnectors = useEvmConnectors();
  const [evmWallet] = useAtom(evmWalletAtom);
  const account = useAccount();
  const { disconnect } = useDisconnect();

  if (account.status === 'connected') {
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
