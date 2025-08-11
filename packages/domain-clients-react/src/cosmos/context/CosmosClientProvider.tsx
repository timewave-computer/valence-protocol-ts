'use client';
import { ReactNode } from "react";
import { useCosmosConfig } from "@/cosmos/hooks";
import { GrazProvider } from "graz";

export const CosmosClientProvider = ({ children }: { children: ReactNode }) => {
  const config = useCosmosConfig();

  return  <GrazProvider grazOptions={config.grazOptions}>{children}</GrazProvider>
};