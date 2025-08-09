export enum ChainType {
    Evm = "evm",
    Cosmos = "cosmos",
  }

export type DomainConnector = {
    walletName: string;
    walletPrettyName: string;
    chainType: ChainType;
    walletInfo: {
      logo?: string;
    };
    connect: (chainId:unknown) => Promise<void>;
    isAvailable: boolean;
  };


  export interface MinimalWalletState {
    id?: string;
    walletName: string;
    chainType: ChainType;
    logo?: string;
  }

