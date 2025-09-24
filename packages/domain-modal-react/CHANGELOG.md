# Changelog

## 0.4.1

### Patch Changes

- bfd9177: Bump react-dom dependency from 18.3.0->18.3.1
- Updated dependencies [bfd9177]
  - @valence-protocol/domain-clients-react@0.4.1

## 0.4.0

### Minor Changes

- 80d52c0: Decouple domain dependencies. You can now install only the domains you need.

### Patch Changes

- Updated dependencies [80d52c0]
  - @valence-protocol/domain-clients-core@0.4.0
  - @valence-protocol/domain-clients-react@0.4.0

# Changelog Archive (pre-automation)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] YYYY-MM-DD

### Fixed

- You no longer need to install peer dependencies for domains you are not using. If they are omitted from the config, the modal will not attempt to instantiate them.
- You no longer need to instantiate a `DomainClientsProvider`, the modal provider handles this internally.

## [0.3.0] 2025-09-03

### Added

- Provider, hooks, and UI for connecting to solana
- Progressive UX to gracefully handle supporting more than one domain
- Cleaner styles

### Changed

- _Breaking_ chainId for evmConnector.connect is required
- _Breaking_ throw errors if trying to use domain without config
- using wagmi `switchChain` is no longer required, the modal does it interally if a target is specified
- Only show wallets that are 'available', do not show compatiable wallets that are not installed
- Updated `@valence-protocol/domain-clients-core` dependency to 0.3.0
- Updated `@valence-protocol/domain-clients-react` dependency to 0.3.0

### Fixed

- DomainModalProvider correctly nested within DomainClientsProvider

## [0.2.0] 2025-08-19

### Changed

- updated `@valence-protocol/domain-clients-core` and `@valence-protocol/domain-clients-react` dependencies

### Added

- optional chainId arg to showModal to connect to non-default chain
- optional chainId arg to useIsEvmConnected

## [0.1.0] 2025-08-18

### Added

- Provider, hook, and stylesheet to use for opening an opinionated modal to manage cross-domain wallet connections
