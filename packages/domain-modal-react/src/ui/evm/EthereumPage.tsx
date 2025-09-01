import { DomainPageRoot } from '@/ui/main';
import { EvmConnection, EvmConnectors } from '@/ui/evm';
import { useIsEvmChainConnected } from '@/hooks';

export const EthereumPage = ({ onBack }: { onBack: () => void }) => {
  const isEvmConnected = useIsEvmChainConnected();
  return (
    <DomainPageRoot title='Ethereum Wallet' onBack={onBack}>
      {isEvmConnected ? <EvmConnectors /> : <EvmConnection />}

      <EvmConnectors />
    </DomainPageRoot>
  );
};
