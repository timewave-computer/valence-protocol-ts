'use client';
import { Button, ConnectionIndicator } from '@/components';
import {
  useCosmosWallet,
  useDomainModal,
  useEvmWallet,
  useIsCosmosChainConnected,
  useIsEvmChainConnected,
  useKeepEvmWalletStateSynced,
  useKeepCosmosWalletStateSynced,
  useKeepSolanaWalletStateSynced,
  useIsSolanaChainConnected,
  useSolanaWallet,
} from '@valence-protocol/domain-modal-react';
import { useAccount as useEvmAccount } from 'wagmi';
import { useAccount as useCosmosAccount } from 'graz';
import { useWalletUi as useSolanaAccount } from '@wallet-ui/react';
import { neutrontestnet } from 'graz/chains';

export const WalletButton = () => {
  const { showModal } = useDomainModal();
  const isCosmosConnected = useIsCosmosChainConnected();
  const isEvmConnected = useIsEvmChainConnected();
  const isSolanaConnected = useIsSolanaChainConnected();

  const evmWallet = useEvmWallet();
  const cosmosWallet = useCosmosWallet();
  const solanaWallet = useSolanaWallet();
  const { address: evmAddress } = useEvmAccount();
  const isConnected = isCosmosConnected || isEvmConnected || isSolanaConnected;

  const { data: cosmosAccount } = useCosmosAccount({
    chainId: neutrontestnet.chainId,
  });
  const cosmosAddress = cosmosAccount?.bech32Address;

  const { account: solanaAccount } = useSolanaAccount();
  const solanaAddress = solanaAccount?.address;

  // required to load the wallet logos before modal is opened
  useKeepEvmWalletStateSynced();
  useKeepCosmosWalletStateSynced();
  useKeepSolanaWalletStateSynced();

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

        {isSolanaConnected && solanaAddress && (
          <ConnectionIndicator
            address={solanaAddress}
            logo={solanaWallet?.walletInfo.logo}
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
