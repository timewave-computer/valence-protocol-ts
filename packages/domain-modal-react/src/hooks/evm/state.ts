'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom, useAtomValue } from 'jotai';

export const evmWalletAtom = atom<MinimalWalletState | undefined>(undefined);

export const useEvmWallet = () => {
  return useAtomValue(evmWalletAtom);
};
