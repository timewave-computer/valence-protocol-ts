import { useAccount } from 'graz';

// this wrapper is added because useAccount returns true for isConnected, even if chainId is given
export const useIsCosmosChainConnected = ({
  chainId,
}: {
  chainId?: string;
}): boolean => {
  const { isConnected, data: accounts } = useAccount({ multiChain: true });
  if (!chainId) {
    return isConnected;
  }
  if (!accounts) return false;
  if (chainId in accounts) return true;
  else return false;
};
