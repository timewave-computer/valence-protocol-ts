'use client';
import { Button } from '@/components';
import {
  useCosmosWallet,
  useDomainModal,
  useEvmWallet,
  useIsCosmosChainConnected,
  useIsEvmChainConnected,
  useKeepEvmWalletStateSynced,
  useKeepCosmosWalletStateSynced,
} from '@valence-protocol/domain-modal-react';
import { useAccount as useEvmAccount } from 'wagmi';
import { useAccount as useCosmosAccount } from 'graz';
import { neutrontestnet } from 'graz/chains';
import { shortenAddress } from '@valence-protocol/domain-modal-react';

export const WalletButton = () => {
  const { showModal } = useDomainModal();
  const isCosmosConnected = useIsCosmosChainConnected();
  const isEvmConnected = useIsEvmChainConnected();

  const evmWallet = useEvmWallet();
  const cosmosWallet = useCosmosWallet();
  const { address: evmAddress } = useEvmAccount();
  const isConnected = isCosmosConnected || isEvmConnected;

  const { data: cosmosAccount } = useCosmosAccount({
    chainId: neutrontestnet.chainId,
  });
  const cosmosAddress = cosmosAccount?.bech32Address;

  // required to load the wallet logos before modal is opened
  useKeepEvmWalletStateSynced();
  useKeepCosmosWalletStateSynced();

  if (isConnected) {
    return (
      <Button
        variant='secondary'
        className='flex flex-row items-center gap-4'
        onClick={() => showModal()}
      >
        {isEvmConnected && evmAddress && (
          <ConnectionIndicator
            address={evmAddress}
            logo={evmWallet?.walletInfo.logo}
          />
        )}

        {isCosmosConnected && cosmosAddress && (
          <ConnectionIndicator
            address={cosmosAddress}
            logo={cosmosWallet?.walletInfo.logo}
          />
        )}
      </Button>
    );
  }
  return <Button onClick={() => showModal()}>Connect Wallet</Button>;
};

const ConnectionIndicator = ({
  logo,
  address,
}: {
  logo?: string;
  address: string;
}) => {
  return (
    <div className='flex flex-row items-center gap-1'>
      <WalletLogo logo={logo} />
      <p className='text-xs text-gray-900 font-mono'>
        {shortenAddress(address)}
      </p>
    </div>
  );
};

export const WalletLogo = ({
  logo,
  className = '',
}: {
  logo?: string;
  className?: string;
}) => {
  if (!logo) {
    return (
      <div
        className={`w-4 h-4 rounded-sm bg-gray-400 flex items-center justify-center text-white text-xs font-medium`}
      >
        w
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt='Wallet Logo'
      className={`rounded-sm h-4 w-4  ${className}`}
    />
  );
};
