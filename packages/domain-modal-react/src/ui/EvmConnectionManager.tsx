'use client'

import { evmWalletAtom, useEvmConnectors, } from "@/evm";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";

export const EvmConnectionManager = () => {
    const evmConnectors = useEvmConnectors();
    const [evmWallet] = useAtom(evmWalletAtom);
    const account = useAccount();
    const currentConnector = account.connector;

    if (account.isConnected) {
        return <div>
            <h1>Connected</h1>
            <p>Wallet: {evmWallet?.walletName}</p>
            <button onClick={() => currentConnector?.disconnect?.()}>Disconnect</button>
        </div>
    }
    else return <div>
        {evmConnectors.map(connector => (
            <div key={connector.walletInfo.walletName}>
                <h2>{connector.walletInfo.walletName}</h2>
                <p>{connector.walletInfo.walletPrettyName}</p>
                <button onClick={() =>
                    connector.connect(1) // TODO: this should not be hardcoded
                }>Connect</button>
            </div>
        ))}
    </div>


 
};