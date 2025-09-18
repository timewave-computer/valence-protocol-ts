'use client';
import { useEffect } from 'react';
import { solanaWalletAtom, useIsSolanaChainConnected } from '@/hooks/solana';
import { getSolanaTargetCluster, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react';
import { useAtomValue } from 'jotai';
import { AccountCard, ConnectionRoot } from '@/ui/common';

export const SolanaConnection = () => {
  const solanaWallet = useAtomValue(solanaWalletAtom);
  const { disconnect, account } = useWalletUi();
  console.log('solanaaccount in modal', account);
  const isConnected = useIsSolanaChainConnected();
  const config = useSolanaConfig();
  const { targetChains } = useDomainModal();
  const { clusters, setCluster, cluster } = useWalletUiCluster();

  useEffect(() => {
    const targetClusterId =
      getSolanaTargetCluster(targetChains) ?? config.defaultClusterId;
    const targetCluster = clusters.find(c => c.id === targetClusterId);
    if (targetCluster) {
      setCluster(targetCluster.id);
    }
  }, [clusters, targetChains, config.defaultClusterId, setCluster]);

  if (!config) {
    throw new Error(
      'Attempted to use SolanaConnectionManager with undefined solana config'
    );
  }

  if (!isConnected || !account) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot title='Solana Wallet'>
      <AccountCard
        wallet={solanaWallet?.walletInfo}
        address={account?.address}
        onDisconnect={async () => disconnect()}
        chainName={cluster?.label}
      />
    </ConnectionRoot>
  );
};
