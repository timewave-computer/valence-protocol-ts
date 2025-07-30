import { ReactNode } from "react";
import { useValenceEvmConfig } from "@/evm";
import { WagmiProvider } from "wagmi";


  
 export const EvmProvider = ({  children }: { children: ReactNode }) => {
    const config = useValenceEvmConfig();
    return   <WagmiProvider config={config}>{children}</WagmiProvider>
  };