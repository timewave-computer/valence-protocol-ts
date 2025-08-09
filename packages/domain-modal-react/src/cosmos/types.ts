import { DomainConnector } from "@/common";

export type CosmosConnector = Omit<DomainConnector, 'connect'> & {
    connect: (chainId: string) => Promise<void>}