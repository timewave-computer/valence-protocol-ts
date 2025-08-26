'use client';

import {
  solanaWalletAtom,
  useIsSolanaConnected,
  useSolanaConnectors,
} from '@/hooks/solana';
import { getSolanaTargetRpcUrlOrMoniker, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUi } from '@wallet-ui/react';
import { useAtomValue } from 'jotai';
import { AccountCard, SelectWalletButton } from '@/ui/common';

export const SolanaConnectionManager = () => {
  const solanaConnectors = useSolanaConnectors();
  const solanaWallet = useAtomValue(solanaWalletAtom);
  const { disconnect, account, cluster } = useWalletUi();
  const isConnected = useIsSolanaConnected();
  const config = useSolanaConfig();
  const { targetChains } = useDomainModal();
  const targetRpcUrlOrMoniker =
    getSolanaTargetRpcUrlOrMoniker(targetChains) ?? config.defaultUrlOrMoniker;

  if (!config) {
    throw new Error(
      'Attempted to use SolanaConnectionManager with undefined solana config'
    );
  }

  if (isConnected) {
    return (
      <AccountCard
        wallet={solanaWallet?.walletInfo}
        address={account?.address}
        onDisconnect={async () => disconnect()}
        chainName={cluster?.label}
      />
    );
  }
  return (
    <div className='flex flex-col gap-2'>
      {solanaConnectors.length === 0 && (
        <div className='px-4 py-3 border border-gray-200 rounded-sm'>
          <p className='text-sm font-medium'>No compatible wallets detected.</p>
        </div>
      )}
      {solanaConnectors.map(connector => {
        return (
          <SelectWalletButton
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={() => connector.connect()}
          />
        );
      })}
    </div>
  );
};
