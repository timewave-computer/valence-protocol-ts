'use client';
import { useEffect, useState } from 'react';
import { useEvmConnectors } from '@/hooks';
import { NoWalletsAvailable, SelectWalletButton } from '@/ui/common';
import { useEvmConfig } from '@valence-protocol/domain-clients-react';
import { getEvmTargetChain, useDomainModal } from '@/ui/context';

export const EvmConnectors = ({ onSuccess }: { onSuccess?: () => void }) => {
  const evmConnectors = useEvmConnectors();
  const config = useEvmConfig();
  const { targetChains } = useDomainModal();
  const [chainIdToConnect, setChainIdToConnect] = useState<number>(
    config.defaultChainId
  );

  if (!config) {
    throw new Error('Attempting to use EvmConnectors with undefined evmconfig');
  }

  useEffect(() => {
    const targetChainId =
      getEvmTargetChain(targetChains) ?? config.defaultChainId;
    setChainIdToConnect(targetChainId);
  }, [targetChains, config]);

  return (
    <div className='flex flex-col gap-2'>
      {evmConnectors.length === 0 && <NoWalletsAvailable />}
      {evmConnectors.map(connector => (
        <SelectWalletButton
          key={connector.walletInfo.walletName}
          wallet={connector}
          onClick={async () => {
            await connector.connect(chainIdToConnect);
            onSuccess?.();
          }}
        />
      ))}
    </div>
  );
};
