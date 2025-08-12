import { WalletType } from 'graz';

export const supportedCosmosWallets = [
  WalletType.OKX,
  WalletType.KEPLR,
  WalletType.LEAP,
] as const;

// Create a type from the supported wallets array
export type SupportedCosmosWallet = (typeof supportedCosmosWallets)[number];

export const getCosmosWalletInfo = (walletType: WalletType) => {
  const isSupported = isSupportedCosmosWallet(walletType);
  if (!isSupported) {
    throw new Error(`Wallet type ${walletType} is not supported`);
  }
  return cosmosWalletInfo[walletType];
};

/**
 * Typeguard that checks if a WalletType is a supported Cosmos wallet
 * @param walletType - The wallet type to check
 * @returns True if the wallet type is supported, false otherwise
 */
export const isSupportedCosmosWallet = (
  walletType: WalletType
): walletType is SupportedCosmosWallet => {
  return supportedCosmosWallets.includes(walletType as SupportedCosmosWallet);
};

export const cosmosWalletInfo: Record<
  SupportedCosmosWallet,
  {
    name: string;
    imgSrc: string;
    mobile?: boolean;
  }
> = {
  [WalletType.OKX]: {
    name: 'OKX',
    imgSrc:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=',
  },
  [WalletType.KEPLR]: {
    name: 'Keplr',
    imgSrc:
      'https://raw.githubusercontent.com/graz-sh/graz/dev/example/starter/public/assets/wallet-icon-keplr.png',
  },
  [WalletType.LEAP]: {
    name: 'Leap',
    imgSrc:
      'https://raw.githubusercontent.com/graz-sh/graz/dev/example/starter/public/assets/wallet-icon-leap.png',
  },
  // unsupported wallets
  // assets can be found at https://github.com/graz-sh/graz/blob/0dfcd2ff58043e4d10a9255bdca684258369786f/example/starter/src/utils/graz.ts
  // [WalletType.COSMOSTATION]: { ... },
  // [WalletType.VECTIS]: { ... },
  // [WalletType.STATION]: { ... },
  // [WalletType.XDEFI]: { ... },
  // [WalletType.METAMASK_SNAP_LEAP]: { ... },
  // [WalletType.METAMASK_SNAP_COSMOS]: { ... },
  // [WalletType.WALLETCONNECT]: { ... },
  // [WalletType.WC_KEPLR_MOBILE]: { ... },
  // [WalletType.WC_LEAP_MOBILE]: { ... },
  // [WalletType.WC_COSMOSTATION_MOBILE]: { ... },
  // [WalletType.COSMIFRAME]: { ... },
  // [WalletType.COMPASS]: { ... },
};
