

import { EvmConnectionManager } from "@/ui";

export interface ModalContentProps {
  isEvmEnabled?: boolean;
  isCosmosEnabled?: boolean;
}
export const ModalContent = ({isEvmEnabled=true, isCosmosEnabled=true}: ModalContentProps) => {
  return <div className="flex flex-col gap-4">
    <h1 className="text-xl font-bold">Select wallet</h1>
    {isEvmEnabled && <div>
      <h2 className="text-lg font-bold">Ethereum</h2>
       <EvmConnectionManager /></div>}
    </div>;
};