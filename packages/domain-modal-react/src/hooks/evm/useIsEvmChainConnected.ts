import { useAccount } from 'wagmi';

export const useIsEvmChainConnected = (chainId?: number): boolean => {
  const { chain, isConnected } = useAccount();
  if (!chainId) {
    return isConnected;
  }
  return chain?.id === chainId;
};
