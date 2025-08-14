'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom, useAtomValue } from 'jotai';

export interface EvmWalletState extends MinimalWalletState {
  connect: (chainId: number) => Promise<void>;
  disconnect: (chainId: number) => Promise<void>;
}

export const evmWalletAtom = atom<EvmWalletState | undefined>(undefined);

export const useEvmWallet = () => {
  return useAtomValue(evmWalletAtom);
};
