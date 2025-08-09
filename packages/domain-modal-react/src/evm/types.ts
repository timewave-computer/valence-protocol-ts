import { DomainConnector } from "@/common";

export type EvmConnector = Omit<DomainConnector, 'connect'> & {
    connect: (chainId: number) => Promise<void>}