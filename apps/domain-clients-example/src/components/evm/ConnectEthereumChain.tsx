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
        variant='ghost'
        className='w-fit min-w-60'
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect {chainName}
      </Button>
    );
  }

  return (
    <Button
      className='w-fit min-w-60'
      onClick={() => {
        switchChain({ chainId: chainId });
        showModal({
          evm: chainId,
        });
      }}
    >
      Connect {chainName}
    </Button>
  );
};
