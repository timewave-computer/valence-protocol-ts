export enum ChainType {
  Evm = 'evm',
  Cosmos = 'cosmos',
}

export type MinimalWalletInfo = {
  logo?: string;
  walletName: string;
  walletPrettyName: string;
};

export type DomainConnector = {
  chainType: ChainType;
  walletInfo: MinimalWalletInfo;
  connect: (chainId: unknown) => Promise<void>;
  isAvailable: boolean;
};

export interface MinimalWalletState {
  id?: string; // pubkey, to detect if user changed connected wallet
  walletInfo: MinimalWalletInfo;
  chainType: ChainType;
}
