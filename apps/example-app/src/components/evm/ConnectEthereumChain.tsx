'use client';
import { Button } from '@/components';
import {
  useDomainModal,
  useIsEvmChainConnected,
} from '@valence-protocol/domain-modal-react';
import { useDisconnect, useSwitchChain } from 'wagmi';

export const ConnectEthereumChain = ({
  chainId,
  chainName,
}: {
  chainId: number;
  chainName: string;
}) => {
  const { showModal } = useDomainModal();
  const { switchChain } = useSwitchChain();
  const isEvmConnected = useIsEvmChainConnected(chainId);
  const { disconnect } = useDisconnect();

  if (isEvmConnected) {
    return (
      <Button
        variant='secondary'
        className='w-fit min-w-76'
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect from {chainName}
      </Button>
    );
  }

  return (
    <Button
      className='w-fit min-w-76'
      onClick={() => {
        switchChain({ chainId: chainId });
        showModal({
          evm: chainId,
        });
      }}
    >
      Connect to {chainName}
    </Button>
  );
};
