import { useContext } from "react";
import { DomainClientsConfigContext } from "@/common/context";

export function useDomainConfig() {
    const config = useContext(DomainClientsConfigContext);
    if (!config) throw new Error('useValenceDomainConfig must be used within a ValenceDomainClientsProvider');
    return config;
  } 