'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom } from 'jotai';

export const evmWalletAtom = atom<MinimalWalletState | undefined>(undefined);
