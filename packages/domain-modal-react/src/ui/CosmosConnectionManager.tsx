'use client'

import { useAtom } from "jotai";
import { AccountCard, SelectWalletButton } from "@/ui";
import { useCosmosConnectors, cosmosWalletAtom } from "@/cosmos";
import {useAccount, disconnect} from "graz"



export const CosmosConnectionManager = () => {
    const cosmosConnectors = useCosmosConnectors();
    const [cosmosWallet] = useAtom(cosmosWalletAtom);
    const {data: account} = useAccount({
        chainId: 'neutron-1'
    });


    if (account) {
        return   <AccountCard
        wallet={cosmosWallet?.walletInfo}
        address={account.bech32Address}
        chainName="Cosmos"
        onDisconnect={async () => disconnect()}
        />
    }
    else return <div className="flex flex-col gap-2">
        {cosmosConnectors.map(connector => (
            <SelectWalletButton
            key={connector.walletInfo.walletName}
            wallet={connector}
            onConnect={() => connector.connect('neutron-1')}
            />
      
        ))}
    </div>


 
};