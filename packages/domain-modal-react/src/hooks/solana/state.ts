'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom, useAtomValue } from 'jotai';

export const solanaWalletAtom = atom<MinimalWalletState | undefined>(undefined);

export const useSolanaWallet = () => {
  return useAtomValue(solanaWalletAtom);
};
