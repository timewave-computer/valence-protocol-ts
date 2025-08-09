'use client';

import { MinimalWalletState } from "@/common";
import { atom } from "jotai";

export const evmWalletAtom = atom<MinimalWalletState|undefined>(undefined);
