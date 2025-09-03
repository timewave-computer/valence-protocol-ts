'use client';
import { useEffect } from 'react';
import { SolanaConnector, useSolanaConnectors } from '@/hooks/solana';
import { getSolanaTargetCluster, useDomainModal } from '@/index';
import { useSolanaConfig } from '@valence-protocol/domain-clients-react';
import { useWalletUiCluster } from '@wallet-ui/react';
import { NoWalletsAvailable, SelectWalletButton } from '@/ui/common';
import { useWalletUiWallet } from '@wallet-ui/react';

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
          <ConnectSolanaWalletButton
            connector={connector}
            onSuccess={onSuccess}
          />
        );
      })}
    </div>
  );
};

const ConnectSolanaWalletButton = ({
  connector,
  onSuccess,
}: {
  connector: SolanaConnector;
  onSuccess?: () => void;
}) => {
  const { connect } = useWalletUiWallet({ wallet: connector.wallet });

  return (
    <SelectWalletButton
      wallet={connector}
      onConnect={async () => {
        await connect();
        onSuccess?.();
      }}
    />
  );
};
