'use client';

import { useWalletUi } from '@wallet-ui/react';

export const useIsSolanaConnected = () => {
  const { connected } = useWalletUi();
  return connected;
};
