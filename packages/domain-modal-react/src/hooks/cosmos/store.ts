'use client';

import { MinimalWalletState } from '@/hooks/common';
import { atom } from 'jotai';

export const cosmosWalletAtom = atom<MinimalWalletState | undefined>(undefined);
