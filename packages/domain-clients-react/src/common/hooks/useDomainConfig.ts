import { useContext } from "react";
import { DomainClientsConfigContext } from "@/common/context";

export function useDomainConfig() {
    const config = useContext(DomainClientsConfigContext);
    if (!config) throw new Error('useDomainConfig must be used within a DomainClientsProvider');
    return config;
  } 