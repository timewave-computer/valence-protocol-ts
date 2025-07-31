import { useContext } from "react";
import { ValenceDomainClientsConfigContext } from "@/common/context";

export function useValenceDomainConfig() {
    const config = useContext(ValenceDomainClientsConfigContext);
    if (!config) throw new Error('useValenceDomainConfig must be used within a ValenceDomainClientsProvider');
    return config;
  } 