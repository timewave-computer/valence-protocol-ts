# Valence Protocol TS Documentation

This library was built to make it easier to build cross-domain applications in JS. It unites ecosystem-specific tooling, provides some helpful abstractions but gives you the flexibility to do anything more specific, and offers a configurable modal to manage connections across one or more domains you would like to support in your app.

Libraries are in their early stage. APIs subject to change.

For developer docs, see `docs` folder.

## Getting started

1. Install valence-protocol dependencies

```bash
pnpm install @valence-protocol/domain-clients-core @valence-protocol/domain-clients-react @valence-protocol/domain-modal-react
```

2. Install peer dependencies
   Note: for the short term you need to install dependencies for all three supported domains (solana, evm, cosmos). There is a little more work required to allow you to install peer dependencies only for the domains that you wantt. You can still choose which domains show up in the modal in the config.

```bash
# EVM
pnpm install wagmi viem

# Solana
pnpm install gill @wallet-ui/react
## when interacting with frameworks that have not moved to @solana/kit (used by gill under the hood and importable through gill), you may need to install @solana/web3.js @solana/compat

# Cosmos
pnpm install graz
```

For graz, you will also need to add a post-install script to install chains locally. They will not be packaged with you app unless you import them.

```json
{
  "scripts": {
    "postinstall": "pnpm gen:cosmos",
    "gen:cosmos": "graz generate -g"
  }
}
```

3. Define config.

- Note:\* for the short term you MUST fill some config for each domain. This will be addressed soon. If you don't want the modal to support this domain, set `hide=true` in the config. You can copy [these](https://github.com/timewave-computer/valence-protocol-ts/tree/next/apps/domain-clients-example/src/config/domainClientsConfig) config files as an example, and have minimal input for the domains you don't want to support.

The root config must be

```javascript
import { DomainClientsConfig } from '@valence-protocol/domain-clients-react';

export const domainClientsConfig: DomainClientsConfig = {
  evm: evmConfig,
  cosmos: cosmosConfig,
  solana: solanaConfig,
};
```

4. Create app providers component with `DomainClientsProvider` and `DomainModalProvider`. They are kept separate in case you want to use a custom modal altogether.

```javascript
'use client' // for Next.js 14+

import { domainClientsConfig } from '@/config';
import { ReactQueryProvider } from '@/context';
import { DomainClientsProvider } from '@valence-protocol/domain-clients-react';
import { DomainModalProvider } from '@valence-protocol/domain-modal-react';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <DomainClientsProvider config={domainClientsConfig}>
        <DomainModalProvider>{children}</DomainModalProvider>
      </DomainClientsProvider>
    </ReactQueryProvider>
  );
};
```

5. Wrap root project in providers and import css

```javascript
import '@valence-protocol/domain-modal-react/styles.css';

const Root = () => {
    ...
    return (
        <AppProviders>
            {children}
        </AppProviders>
  );
};

```

6. Open the modal with `showModal`

```javascript
import { useDomainModal } from '@valence-protocol/domain-modal-react';

const { showModal } = useDomainModal();
```

## About the libraries

### `domain-clients-core`

Pure-JS code that abstract common, implementation-specific methods away. They have a few pre-built operations for you (such as transferring tokens and reading balances). To do anything not pre-built, you can call `getClient` on the respective client and perform anything else with it. More common use patterns will be added over time.

The imports per-domain are tree-shakeable.

### `domain-clients-react`

A React provider and hooks to access the config via context within the app, and use domain clients via react hooks.

The imports per-domain are tree-shakeable.

### `domain-modal-react`

A React provider and component that allows you to support connecting wallets and accessing the state. It is a loose wrapper around the domain-specific UI hooks.

This is NOT YET tree shakeable. It will be in the future.

## How to use the libraries

Please reference the example app, but here are some basics:

### Server-side

See `server/` in the example app for more exmaples.

```javascript
import { domainClientsConfig } from '@/config/domainClientsConfig';
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';
import { type Address, erc20Abi } from 'viem';

const evmClient = new EvmClient({
    config: config.wagmiConfig,
    chainId,
});

const balance = await evmClient.queryErc20Balance({
    contractAddress: erc20Address,
    address,
});
```

### Front end

If your app is wrapped in the DomainClientsProvider, you can simply call `useXSigningClient` and `useXClient` to access these via hook. You will need to specify which chain you want to target, and it will use the rpc in your config file.

```javascript
import {
  solanaClient,
  useSigningSolanaClient,
  useCosmosClient,
  useSigningCosmosClient,
  useEvmClient,
  useSigningEvmClient,
} from '@valence-protocol/domain-clients-react/solana';

const solananClient = useSolanaClient({ clusterId });
const signingSolanaClient = useSigningSolanaClient({ clusterId });

const cosmosClient = useCosmosClient({ chainId });
const signingCosmosClient = useSigningCosmosClient({ chainId });

const evmClient = useEvmClient({ chainId });
const signingEvmClient = useSigningEvmClient({ chainId });
```

!!! FYI: Due to to a quirk with the Solana wallet library, you can only instantiate `useSigningSolanaClient` if a solana wallet is already connected. Otherwise it will crash your app. The short-term workaround is to only instantiate the hook within an "account guard".

```javascript
import { useWalletUiAccount } from '@wallet-ui/react'; // solana wallet toolings

export const SolanaAccountGuard = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  const { account } = useWalletUiAccount();

  if (!account) {
    return fallback;
  }

  return <>{children}</>;
};
```

You can also access the config with

```javascript
const config = useDomainConfig();
```

### Domain-specific hooks

Use various domain-specific utils as needed. They will work as expected because we render their providers under the hod. The implementation and naming for each varies. You can dig into the tool-specific docs as needed.

```javascript
import { useAccount as useEvmAccount } from 'wagmi';
import { useAccount as useCosmosAccount } from 'graz';
import { useWalletUi as useSolanaAccount } from '@wallet-ui/react';
```

This is about it! Feel free to raise issues.
