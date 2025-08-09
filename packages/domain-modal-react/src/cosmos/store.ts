'use client';

import { MinimalWalletState } from "@/common";
import { atom } from "jotai";

export const cosmosWalletAtom = atom<MinimalWalletState|undefined>(undefined);