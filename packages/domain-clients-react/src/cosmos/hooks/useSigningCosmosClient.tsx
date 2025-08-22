'use client';
import { useMemo } from 'react';
import { useCosmosSigningChainConfig, useCosmosSigningTypes } from '@/cosmos';
import { SigningCosmosClient } from '@valence-protocol/domain-clients-core/cosmos';
import { useAccount, useOfflineSigners } from 'graz';

export function useSigningCosmosClient({
  chainId,
}: {
  chainId: string;
}): SigningCosmosClient | undefined {
  const signingTypes = useCosmosSigningTypes();
  const { chainInfo, chainConfig } = useCosmosSigningChainConfig(chainId);

  const { data: account } = useAccount({ chainId });
  const { data: signers } = useOfflineSigners({ chainId });

  const offlineSigner = useMemo(() => {
    return signers?.offlineSigner;
  }, [signers]);

  const accountAddress = useMemo(() => {
    return account?.bech32Address;
  }, [account]);

  return useMemo(() => {
    if (!chainConfig.gas) {
      console.error(`Default gas not set for ${chainId}`);
      return;
    }
    if (!account) {
      console.warn('No cosmos account found');
      return;
    }
    if (!offlineSigner) {
      console.warn('No cosmos offline signer found');
      return;
    }

    const client = new SigningCosmosClient({
      chainId,
      rpcUrl: chainInfo.rpc,
      gas: chainConfig.gas,
      signer: offlineSigner,
      senderAddress: accountAddress,
      protobufRegistry: signingTypes.protobufRegistry,
      aminoTypes: signingTypes.aminoTypes,
    });
    return client;
  }, [
    account,
    offlineSigner,
    chainInfo.rpc,
    chainConfig.gas,
    accountAddress,
    signingTypes.protobufRegistry,
    signingTypes.aminoTypes,
  ]);
}
