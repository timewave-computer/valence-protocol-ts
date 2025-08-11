'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtom } from 'jotai';
import { evmWalletAtom, useEvmConnectors } from '@/hooks';
import { AccountCard, SelectWalletButton } from '@/ui/common';

export const EvmConnectionManager = () => {
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
