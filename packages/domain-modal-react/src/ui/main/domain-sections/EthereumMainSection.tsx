'use client';

import { useIsEvmChainConnected } from '@/hooks';
import { EvmConnection } from '@/ui/evm';
import { SelectDomainButton } from '@/ui/common';

export const EthereumMainSection = ({ onClick }: { onClick: () => void }) => {
  const isEvmConnected = useIsEvmChainConnected();

  if (!isEvmConnected) {
    return (
      <SelectDomainButton onClick={onClick}>
        Connect Ethereum Wallet
      </SelectDomainButton>
    );
  }

  return (
    <div>
      <h2>Ethereum Wallet</h2>
      <EvmConnection />
    </div>
  );
};
