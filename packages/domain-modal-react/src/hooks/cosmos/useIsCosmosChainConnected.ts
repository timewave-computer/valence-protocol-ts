import { useAccount } from 'graz';

export interface UseIsCosmosChainConnectedProps {
  chainId?: string;
}

// this wrapper is added because useAccount returns true for isConnected, even if chainId is given
export const useIsCosmosChainConnected = (
  args?: UseIsCosmosChainConnectedProps
): boolean => {
  const { isConnected, data: accounts } = useAccount({ multiChain: true });
  const chainId = args?.chainId;
  if (!chainId) {
    return isConnected;
  }
  if (!accounts) return false;
  if (chainId in accounts) return true;
  else return false;
};
