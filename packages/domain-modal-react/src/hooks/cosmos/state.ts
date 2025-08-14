'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom, useAtomValue } from 'jotai';

export interface CosmosWalletState extends MinimalWalletState {
  connect: (chainId: string) => Promise<void>;
  disconnect: () => Promise<void>;
}
export const cosmosWalletAtom = atom<CosmosWalletState | undefined>(undefined);

export const useCosmosWallet = () => {
  return useAtomValue(cosmosWalletAtom);
};
