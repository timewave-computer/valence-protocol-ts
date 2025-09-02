'use client';

import { useIsEvmChainConnected } from '@/hooks';
import { EvmConnection } from '@/ui/evm';
import { ConnectDomainButton } from '@/ui/common';

export const EthereumMainSection = ({ onClick }: { onClick: () => void }) => {
  const isEvmConnected = useIsEvmChainConnected();

  if (!isEvmConnected) {
    return (
      <ConnectDomainButton onClick={onClick}>
        Connect Ethereum Wallet
      </ConnectDomainButton>
    );
  }

  return (
    <div>
      <h2>Ethereum Wallet</h2>
      <EvmConnection />
    </div>
  );
};
