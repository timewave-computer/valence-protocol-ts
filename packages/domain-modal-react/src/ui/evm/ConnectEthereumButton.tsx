import { useIsEvmChainConnected } from '@/hooks';
import { ConnectDomainButtonRoot } from '@/ui/common';

export const ConnectEthereumButton = ({ onClick }: { onClick: () => void }) => {
  const isEvmConnected = useIsEvmChainConnected();
  if (isEvmConnected) {
    return undefined;
  }
  return (
    <ConnectDomainButtonRoot onClick={onClick}>
      Connect Ethereum
    </ConnectDomainButtonRoot>
  );
};
