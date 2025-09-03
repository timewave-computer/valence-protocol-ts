import { ChainType } from '@/hooks/common/const';

export type MinimalWalletInfo = {
  logo?: string;
  walletName: string;
  walletPrettyName: string;
};

export type DomainConnector = {
  chainType: ChainType;
  walletInfo: MinimalWalletInfo;
  connect: (chainId: unknown) => Promise<void>;
};

export interface MinimalWalletState {
  id?: string; // pubkey, to detect if user changed connected wallet
  walletInfo: MinimalWalletInfo;
  chainType: ChainType;
}
