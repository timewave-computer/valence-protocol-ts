'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useAtomValue } from 'jotai';
import { evmWalletAtom, useEvmConnectors } from '@/hooks';
import { SelectWalletButton, AccountCard } from '@/ui/common';
import { useEvmConfig } from '@valence-protocol/domain-clients-react';
import { getEvmTargetChain, useDomainModal } from '@/ui/context';

export const EvmConnectionManager = () => {
  const evmConnectors = useEvmConnectors();
  const evmWallet = useAtomValue(evmWalletAtom);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const config = useEvmConfig();
  const isConnected = account?.status === 'connected';
  const { targetChains } = useDomainModal();
  const chainIdToConnect =
    getEvmTargetChain(targetChains) ?? config.defaultChainId;

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
        {evmConnectors.length === 0 && (
          <div className='px-4 py-3 border border-gray-200 rounded-sm'>
            <p className='text-sm font-medium'>
              No compatible wallets detected.
            </p>
            <p className='text-xs text-gray-500'>
              Please install an browser wallet that supports Ethereum chains to
              continue.
            </p>
          </div>
        )}
        {evmConnectors.map(connector => (
          <SelectWalletButton
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={() => connector.connect(chainIdToConnect)}
          />
        ))}
      </div>
    );
};
