'use client';

import { ConnectDomainPageRoot } from '@/ui/main';
import { EvmConnection, EvmConnectors } from '@/ui/evm';
import { useIsEvmChainConnected } from '@/hooks';

export const ConnectEthereumPage = ({ onBack }: { onBack?: () => void }) => {
  const isEvmConnected = useIsEvmChainConnected();
  return (
    <ConnectDomainPageRoot
      title={`${isEvmConnected ? 'Ethereum Wallet' : 'Select Ethereum Wallet'}`}
      onBack={onBack}
    >
      {isEvmConnected ? (
        <EvmConnection />
      ) : (
        <EvmConnectors onSuccess={onBack} />
      )}
    </ConnectDomainPageRoot>
  );
};
