export const walletLogoScale = (walletName: string) => {
  // some logos have transparent backgrounds, need to scale them up
  // permanent fix is to change the logo assets in getCosmosWalletInfo
  return {
    Keplr: 'scale-[1.3]',
    Leap: 'scale-[1.3]',
  }[walletName];
};
