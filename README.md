# Valence Protocol TS Documentation

This library was built to make it easier to build cross-domain applications in JS. It unites ecosystem-specific tooling, provides some helpful abstractions but gives you the flexibility to do anything more specific, and offers a configurable modal to manage connections across one or more domains you would like to support in your app.

Valence Protocol TS currently has support for these ecosystems:

1. Ethereum
2. Solana
3. Cosmos

Libraries are in their early stage. APIs subject to change.

For developer docs, see `docs` folder.

## Getting started

1. Install valence-protocol dependencies

```bash
pnpm install @valence-protocol/domain-clients-core @valence-protocol/domain-clients-react @valence-protocol/domain-modal-react
pnpm install @tanstack/react-query ## general peer dependency
```

2. Install peer dependencies
   You will need to install the required libraries for the ecosystem you would like to support.

```bash
# for EVM
pnpm install wagmi viem

# for Solana
pnpm install gill @wallet-ui/react
## note: when interacting with frameworks that have not moved to @solana/kit (used by gill under the hood and importable through gill), you may need to also install @solana/web3.js and @solana/compat

# for Cosmos
pnpm install graz
```

With graz, you will also need to add a post-install script to generate chain info locally. The generated chain infos will not be packaged with your app unless you import them.

```json
{
  "scripts": {
    "postinstall": "pnpm gen:cosmos",
    "gen:cosmos": "graz generate -g"
  }
}
```

3. Define config.
   Copy [these](https://github.com/timewave-computer/valence-protocol-ts/tree/next/apps/domain-clients-example/src/config/domainClientsConfig) config files as an example. Only include the domains you are interested in working with.

Example of the root config:

```javascript
import { DomainClientsConfig } from '@valence-protocol/domain-clients-react';

export const domainClientsConfig: DomainClientsConfig = {
  evm: evmConfig,
  cosmos: cosmosConfig,
  solana: solanaConfig,
};
```

4. Wrap your app root in a `DomainModalProvider` and `ReactQueryProvider` and import css. For Next.js 14+, you will need to wrap the providers in a client component.

```javascript
// AppProvider.tsx (for Next.js 14+)

'use client'
import { domainClientsConfig } from '@/config';
import { DomainModalProvider } from '@valence-protocol/domain-modal-react';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <...OtherProviders>
      <ReactQueryProvder {...queryClient}> // TODO: link docs for setting this up
        <DomainModalProvider config={domainClientsConfig}>
          {children}
        </DomainModalProvider>
        </ReactQueryProvider>
    <...OtherProviders>
  );
};
```

```javascript
// layout.tsx or similar application root

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

Pure-JS code that abstract common, implementation-specific methods. There are a few pre-built operations (such as transferring tokens and reading balances). To do anything not pre-built, you can call `getClient` on the respective client and perform anything you need. Commonly used patterns will be added as client functions over time.

Imports per-domain are tree-shakeable. For example:

```javascript
import { EvmClient } from '@valence-protocol/domain-clients-core/evm';
```

### `domain-clients-react`

React hooks and context provider to access the config and use domain clients in a react app.

The imports per-domain are tree-shakeable. For example:

```javascript
import {
  useSigningSolanaClient,
} from '@valence-protocol/domain-clients-react/solana';

// component
const solanaSigningClient = useSolanaSigningClient({clusterId:'solana:devent'})
solanaSigningClient.getSolBalance({...})
solanaSigningClient.transfer({...})

```

### `domain-modal-react`

A React UI component and context provider that allows you to manage wallet connections across multiple domains. It is a loose wrapper around domain-specific UI libraries. Based on the domain clients configuration, it will render the appropriate wallet modal.

The modal will omit dependencies for ecosystems excluded from in the configuration.

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
  useSolanaClient,
  useSigningSolanaClient,
  useCosmosClient,
  useSigningCosmosClient,
  useEvmClient,
  useSigningEvmClient,
} from '@valence-protocol/domain-clients-react';

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

Use various domain-specific hooks and utils as needed. They will work as expected because we render their providers under the hod. The implementation and naming for each varies. You can find some examples of how these are used in the example app, but it is suggested to consult the individual docs.

```javascript
import { useAccount as useEvmAccount } from 'wagmi';
import { useAccount as useCosmosAccount } from 'graz';
import { useWalletUi as useSolanaAccount } from '@wallet-ui/react';
```

## Contact us

Feel free to raise issues, or contact the team on [Telegram](https://t.me/+Sig6DYQn-Ec0NTZh).
