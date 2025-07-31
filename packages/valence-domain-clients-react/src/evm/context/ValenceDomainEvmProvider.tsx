import { ReactNode } from "react";
import { useValenceEvmConfig } from "@/evm/hooks"; 
import { WagmiProvider } from 'wagmi';

export const ValenceDomainEvmProvider = ({ children }: { children: ReactNode }) => {
  const config = useValenceEvmConfig();
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};