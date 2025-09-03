# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] YYYY-MM-DD

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
