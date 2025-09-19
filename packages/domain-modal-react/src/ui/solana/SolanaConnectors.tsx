'use client';
import { useEffect } from 'react';
import { useSolanaConnectors } from '@/hooks/solana';
import { getSolanaTargetCluster, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUiCluster } from '@wallet-ui/react';
import { NoWalletsAvailable, SelectWalletButton } from '@/ui/common';

export const SolanaConnectors = ({ onSuccess }: { onSuccess?: () => void }) => {
  const solanaConnectors = useSolanaConnectors();
  const config = useSolanaConfig();
  const { targetChains } = useDomainModal();
  const { clusters, setCluster } = useWalletUiCluster();

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
  return (
    <div className='flex flex-col gap-2'>
      {!solanaConnectors.length && <NoWalletsAvailable />}
      {solanaConnectors.map(connector => {
        return (
          <SelectWalletButton
            wallet={connector}
            key={connector.walletInfo.walletName}
            onClick={async () => {
              console.log('clicking connector', connector);
              await connector.connect();
              onSuccess?.();
            }}
          />
        );
      })}
    </div>
  );
};
