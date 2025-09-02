'use client';
import { useEffect } from 'react';
import { solanaWalletAtom, useIsSolanaChainConnected } from '@/hooks/solana';
import { getSolanaTargetCluster, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react';
import { useAtomValue } from 'jotai';
import { AccountCard } from '@/ui/common';

export const SolanaConnection = () => {
  const solanaWallet = useAtomValue(solanaWalletAtom);
  const { disconnect, account } = useWalletUi();
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
    throw new Error(
      'SolanaConnection component should only be used when the user is connected to a solana wallet'
    );
  }

  return (
    <AccountCard
      wallet={solanaWallet?.walletInfo}
      address={account?.address}
      onDisconnect={async () => disconnect()}
      chainName={cluster?.label}
    />
  );
};
