import { createClientStore } from '@/common/store';
import { SigningCosmosClient, CosmosClient } from '@valence-protocol/domain-clients-core/cosmos'

// Specific store instances
export const useSigningCosmosClientStore = createClientStore<SigningCosmosClient>()
export const useCosmosClientStore = createClientStore<CosmosClient>()
