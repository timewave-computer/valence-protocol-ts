'use client';
import { Button } from '@/components';
import {
  useDomainModal,
  useIsCosmosChainConnected,
} from '@valence-protocol/domain-modal-react';
import { disconnect, useSuggestChainAndConnect, WalletType } from 'graz';
import { CosmosChainInfo } from '@valence-protocol/domain-clients-core';

export const ConnectCosmosChain = ({
  chainInfo,
}: {
  chainInfo: CosmosChainInfo;
}) => {
  const { showModal } = useDomainModal();
  const { suggestAndConnect } = useSuggestChainAndConnect();
  const isCosmosConnected = useIsCosmosChainConnected({
    chainId: chainInfo.chainId,
  });

  if (isCosmosConnected) {
    return (
      <Button
        variant='ghost'
        className='w-fit min-w-60'
        onClick={() => {
          disconnect({ chainId: chainInfo.chainId });
        }}
      >
        Disconnect {chainInfo.chainName}
      </Button>
    );
  }
  return (
    <Button
      className='w-fit min-w-60'
      onClick={() => {
        suggestAndConnect({
          chainInfo: chainInfo,
          walletType: WalletType.KEPLR,
        });
        showModal({
          cosmos: chainInfo.chainId,
        });
      }}
    >
      Connect {chainInfo.chainName}
    </Button>
  );
};
