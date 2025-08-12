'use client';
import { useEffect, useMemo } from 'react';
import {
  useCosmosSigningChainConfig,
  useCosmosSigningTypes,
  useSigningCosmosClientStore,
} from '@/cosmos';
import { SigningCosmosClient } from '@valence-protocol/domain-clients-core/cosmos';
import { useAccount, useOfflineSigners, disconnect } from 'graz';
import { OfflineSigner } from '@cosmjs/proto-signing';

export interface UseSigningCosmosClientResult {
  client: SigningCosmosClient | null;
  account?: string;
  signer?: OfflineSigner;
  disconnect: () => void;
}

export function useSigningCosmosClient(
  chainId: string
): UseSigningCosmosClientResult {
  const signingTypes = useCosmosSigningTypes();
  const { chainInfo, chainConfig } = useCosmosSigningChainConfig(chainId);

  const { data: account } = useAccount({ chainId });
  const { data: signers } = useOfflineSigners({ chainId });

  const { client, setClient } = useSigningCosmosClientStore();

  const offlineSigner = useMemo(() => {
    return signers?.offlineSigner;
  }, [signers]);

  const accountAddress = useMemo(() => {
    return account?.bech32Address;
  }, [account]);

  useEffect(() => {
    if (!account) return;

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
    signers,
    chainInfo,
    chainConfig,
    account,
    offlineSigner,
    accountAddress,
    signingTypes,
    setClient,
  ]);

  return useMemo(
    () => ({
      client,
      account: accountAddress,
      signer: offlineSigner,
      disconnect,
    }),
    [client, offlineSigner, accountAddress]
  );
}
