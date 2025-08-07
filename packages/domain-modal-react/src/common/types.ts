export enum ChainType {
    Evm = "evm",
    Cosmos = "cosmos",
  }
export type DomainConnector = {
    walletName: string;
    walletPrettyName: string;
    walletChainType: ChainType;
    walletInfo: {
      logo?: string;
    };
    connect: (chainId?: string) => Promise<void>;
    disconnect: (chainId?: string) => Promise<void>;
    isAvailable: boolean;
  };