import {  useEffect, useMemo } from 'react';
import { useCosmosChainConfig, useCosmosSigningTypes, useSigningCosmosClientStore } from '@/cosmos';
import { SigningCosmosClient } from '@valence-protocol/domain-clients-core/cosmos';
import { useAccount, useOfflineSigners, disconnect } from 'graz';
import { OfflineSigner } from '@cosmjs/proto-signing';

export interface UseSigningCosmosClientResult {
  client: SigningCosmosClient | null;
  account?: string;
  signer?: OfflineSigner;
  disconnect: () => void;
}

export function useSigningCosmosClient(chainId: string): UseSigningCosmosClientResult {
  const {protobufRegistry, aminoTypes} = useCosmosSigningTypes();
  const config = useCosmosChainConfig(chainId);

  const {data: account} = useAccount({chainId});
  const {data: signers} = useOfflineSigners({chainId}); 

  const {client, setClient} = useSigningCosmosClientStore();

  const offlineSigner = useMemo(() => {
    return signers?.offlineSigner;
  }, [signers]);

  const accountAddress = useMemo(() => {
    return account?.bech32Address;
  }, [account]);

  useEffect(() => {
    if (!account) return;
 
    setClient(new SigningCosmosClient({
      chainId,
      rpcUrl: config.chainInfo.rpc,
      gas: config.chainConfig.gas,
      signer: offlineSigner,
      senderAddress: accountAddress,
      protobufRegistry,
      aminoTypes,
    }));
  }, [signers,config, account]);

  return useMemo(() => ({
    client,
    account: accountAddress,
    signer: offlineSigner,
    disconnect,
 
  }), [client, account, offlineSigner]);

} 