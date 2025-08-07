# Valence Domain Clients Example App

This is a [Next.js](https://nextjs.org) example app that demonstrates using Valence Domain Clients and the Valence Domain Modal.

## Development
To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating Config
There are ecosystem-specific tools for generating chain configuration. For clarity and discoverability, `@valence-protocol/domain-clients-react` abstracts the config creators for each ecosystem under a thin, renamed wrapper, but the methods can be imported directly from the installed libraries as well.

### EVM
[wagmi](https://wagmi.sh/core/api/chains) is installed as a dependency, to import chain configuration from `wagmi/chains` and utils from `wagmi`


### Cosmos
[graz](https://graz.sh/docs/generate-chain-info) is installed as a dependency. `graz generate -g` (aliased in package.json to gen:cosmos) generates chain config locally, and can be imported from `graz/chains`. This is added to postinstall sceipts to make sure the data is available in CI. 


## Bundle analyzer
run `ANALYZE=true pnpm build` to inspect bundle size.

## Dependencies
`DomainModalContext.Provider` must be wrapped in a QueryProvider from `@tanstack/react-query`.