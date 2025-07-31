// clientStore.ts
import { create } from 'zustand'

type ClientState<T> = {
  client: T | null
  setClient: (client: T) => void
  clearClient: () => void
}

// Generic store factory function
export const createClientStore = <T>() => 
  create<ClientState<T>>((set) => ({
    client: null,
    setClient: (client) => set({ client }),
    clearClient: () => set({ client: null })
  }))

