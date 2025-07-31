// clientStore.ts
import { create } from 'zustand'

type ClientState = {
  cosmosClient: SigningCosmosClient | null
  setCosmosClient: (client: SigningCosmosClient) => void
  clearClients: () => void
}

export const useClientStore = create<ClientState>((set) => ({
  cosmosClient: null,
  setCosmosClient: (client) => set({ cosmosClient: client }),
  clearClients: () => set({ cosmosClient: null })
}))
