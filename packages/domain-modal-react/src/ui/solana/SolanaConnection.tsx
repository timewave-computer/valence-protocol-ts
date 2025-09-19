'use client';
import { useEffect, useState } from 'react';
import { solanaWalletAtom, useIsSolanaChainConnected } from '@/hooks/solana';
import { getSolanaTargetCluster, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useAtomValue } from 'jotai';
import { AccountCard, ConnectionRoot } from '@/ui/common';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  SolanaCluster,
  SolanaClusterId,
} from '@valence-protocol/domain-clients-core/solana';
import { useWalletUiCluster } from '@wallet-ui/react';

export const SolanaConnection = () => {
  const solanaWallet = useAtomValue(solanaWalletAtom);
  const wallet = useWallet();
  console.log('in check connected hook', wallet);
  const isConnected = useIsSolanaChainConnected();
  const config = useSolanaConfig();
  const { targetChains } = useDomainModal();
  const { cluster, setCluster } = useWalletUiCluster();

  // useEffect(() => {
  //     const targetClusterId = getSolanaTargetCluster(targetChains) ?? config.defaultClusterId;
  //     const targetCluster = config.clusters.find(c => c.id === targetClusterId);
  //     if (targetCluster) {
  //       setCluster({...targetCluster, url: targetCluster.urlOrMoniker});
  //     }
  // }, [config, targetChains, setCluster]);

  if (!config) {
    throw new Error(
      'Attempted to use SolanaConnectionManager with undefined solana config'
    );
  }

  if (!isConnected || !wallet.publicKey) {
    // this is intentional, it lets us optimistically render the component and avoids tree-shaking issues when some domain configs are not set
    return undefined;
  }

  return (
    <ConnectionRoot title='Solana Wallet'>
      <AccountCard
        wallet={solanaWallet?.walletInfo}
        address={wallet.publicKey?.toString()}
        onDisconnect={async () => wallet.disconnect()}
        chainName={cluster?.label}
      />
    </ConnectionRoot>
  );
};
