import { createClientStore } from '@/common/store';
import { SigningEvmClient, EvmClient } from '@valence-protocol/domain-clients-core/evm'

// Specific store instances
export const useEvmSigningClientStore = createClientStore<SigningEvmClient>()
export const useEvmClientStore = createClientStore<EvmClient>()
