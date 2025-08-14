'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom, useAtomValue } from 'jotai';

export const cosmosWalletAtom = atom<MinimalWalletState | undefined>(undefined);

export const useCosmosWallet = () => {
  return useAtomValue(cosmosWalletAtom);
};
