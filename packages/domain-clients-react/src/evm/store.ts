import {
  SigningEvmClient,
  EvmClient,
} from '@valence-protocol/domain-clients-core/evm';
import { create } from 'zustand';

type EvmClientState = {
  clients: Record<number, EvmClient | undefined>;
  setClient: (chainId: number, client: EvmClient) => void;
};

type SigningEvmClientState = {
  clients: Record<number, SigningEvmClient | undefined>;
  setClient: (chainId: number, client: SigningEvmClient) => void;
};

export const useEvmClientStore = create<EvmClientState>(set => ({
  clients: {},
  setClient: (chainId, client) =>
    set(state => ({
      clients: { ...state.clients, [chainId]: client },
    })),
}));

export const useSigningEvmClientStore = create<SigningEvmClientState>(set => ({
  clients: {},
  setClient: (chainId, client) =>
    set(state => ({
      clients: { ...state.clients, [chainId]: client },
    })),
}));
