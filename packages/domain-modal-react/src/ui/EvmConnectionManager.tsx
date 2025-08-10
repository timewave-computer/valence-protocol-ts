'use client'

import { evmWalletAtom, useEvmConnectors, } from "@/evm";
import { useAccount, useDisconnect } from "wagmi";
import { useAtom } from "jotai";
import { AccountCard, SelectWalletButton } from "@/ui";



export const EvmConnectionManager = () => {
    const evmConnectors = useEvmConnectors();
    const [evmWallet] = useAtom(evmWalletAtom);
    const account = useAccount();
    const { disconnect } = useDisconnect();


    if (account.status === "connected") {
        return   <AccountCard
        wallet={evmWallet?.walletInfo}
        address={account.address}
        chainName="Ethereum"
        onDisconnect={async () => disconnect()}
        />
    }
    else return <div className="flex flex-col gap-2">
        {evmConnectors.map(connector => (
            <SelectWalletButton
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={() => connector.connect(1)}
            />
      
        ))}
    </div>


 
};