'use client';
import { Button } from '@/components';
import {
  useDomainModal,
  useIsSolanaConnected,
} from '@valence-protocol/domain-modal-react';
import { useWalletUi } from '@wallet-ui/react';
import { SolanaClusterId } from '@valence-protocol/domain-clients-core/solana';

export const ConnectSolana = ({
  chainName,
  clusterId,
}: {
  chainName: string;
  clusterId: SolanaClusterId;
}) => {
  const { showModal } = useDomainModal();
  const isSolanaConnected = useIsSolanaConnected({ clusterId });
  const { disconnect } = useWalletUi();
  if (isSolanaConnected) {
    return (
      <Button variant='ghost' onClick={() => disconnect()}>
        Disconnect {chainName}
      </Button>
    );
  }
  return (
    <Button onClick={() => showModal({ solana: clusterId })}>
      Connect {chainName}
    </Button>
  );
};
