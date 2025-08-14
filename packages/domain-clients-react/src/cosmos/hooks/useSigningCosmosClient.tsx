'use client';
import { useEffect, useMemo, useState } from 'react';
import { useCosmosSigningChainConfig, useCosmosSigningTypes } from '@/cosmos';
import { SigningCosmosClient } from '@valence-protocol/domain-clients-core/cosmos';
import { useAccount, useOfflineSigners } from 'graz';
export interface UseSigningCosmosClientResult {
  client: SigningCosmosClient | undefined;
}

export function useSigningCosmosClient({
  chainId,
}: {
  chainId: string;
}): UseSigningCosmosClientResult {
  const signingTypes = useCosmosSigningTypes();
  const { chainInfo, chainConfig } = useCosmosSigningChainConfig(chainId);

  const { data: account } = useAccount({ chainId });
  const { data: signers } = useOfflineSigners({ chainId });

  const [client, setClient] = useState<SigningCosmosClient | undefined>(
    undefined
  );

  const offlineSigner = useMemo(() => {
    return signers?.offlineSigner;
  }, [signers]);

  const accountAddress = useMemo(() => {
    return account?.bech32Address;
  }, [account]);

  useEffect(() => {
    if (!account || !offlineSigner) {
      setClient(undefined);
      return;
    }
    setClient(
      new SigningCosmosClient({
        chainId,
        rpcUrl: chainInfo.rpc,
        gas: chainConfig.gas,
        signer: offlineSigner,
        senderAddress: accountAddress,
        protobufRegistry: signingTypes.protobufRegistry,
        aminoTypes: signingTypes.aminoTypes,
      })
    );
  }, [
    account,
    offlineSigner,
    chainInfo.rpc,
    chainConfig.gas,
    accountAddress,
    signingTypes.protobufRegistry,
    signingTypes.aminoTypes,
  ]);

  return useMemo(
    () => ({
      client,
    }),
    [client]
  );
}
