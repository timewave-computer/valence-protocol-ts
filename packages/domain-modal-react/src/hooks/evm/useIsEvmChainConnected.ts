import { useAccount } from 'wagmi';

export const useIsEvmChainConnected = (): boolean => {
  const { isConnected } = useAccount();
  return isConnected;
};
