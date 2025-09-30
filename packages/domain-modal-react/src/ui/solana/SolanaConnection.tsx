'use client';
import { useEffect } from 'react';
import { solanaWalletAtom, useIsSolanaChainConnected } from '@/hooks/solana';
import { getDomainCount } from '@/ui/util';
import { getSolanaTargetCluster, useDomainModal } from '@/ui/context';
import { useDomainConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react';
import { useAtomValue } from 'jotai';
import { AccountCard, ConnectionRoot } from '@/ui/common';

export const SolanaConnection = () => {
  const solanaWallet = useAtomValue(solanaWalletAtom);
  const { disconnect, account } = useWalletUi();
  const isConnected = useIsSolanaChainConnected();
  const config = useDomainConfig();
  const domainDisplayCount = getDomainCount(config);
  const { targetChains } = useDomainModal();
  const { clusters, setCluster, cluster } = useWalletUiCluster();

  useEffect(() => {
    const targetClusterId =
      getSolanaTargetCluster(targetChains) ?? config.solana?.defaultClusterId;
    const targetCluster = clusters.find(c => c.id === targetClusterId);
    if (targetCluster) {
      setCluster(targetCluster.id);
    }
  }, [clusters, targetChains, config.solana?.defaultClusterId, setCluster]);

  if (!config.solana) {
    throw new Error(
      'Attempted to use SolanaConnectionManager with undefined solana config'
    );
  }

  if (!isConnected || !account) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot
      title={domainDisplayCount > 1 ? 'Solana Wallet' : undefined}
    >
      <AccountCard
        wallet={solanaWallet?.walletInfo}
        address={account?.address}
        onDisconnect={async () => disconnect()}
        chainName={cluster?.label}
      />
    </ConnectionRoot>
  );
};
