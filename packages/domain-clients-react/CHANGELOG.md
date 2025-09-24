# Changelog

## 0.4.1

### Patch Changes

- bfd9177: Bump react-dom dependency from 18.3.0->18.3.1

## 0.4.0

### Minor Changes

- 80d52c0: Decouple domain dependencies. You can now install only the domains you need.

### Patch Changes

- Updated dependencies [80d52c0]
  - @valence-protocol/domain-clients-core@0.4.0

# Changelog Archive (pre-automation)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] YYYY-MM-DD

## [0.3.0] 2025-09-03

### Added

- Solana context provider, and hooks for accessing client and config

### Changed

- Simplify evm and cosmos client hook state
- _Breaking_ change hook input convention to accept object as argument for improved readability
- Updated `@valence-protocol/domain-clients-core` dependency to 0.3.0

### Fixed

- Domain provider conditional rendering offloaded to domain specific providers. Unavailable config will no longer throw error, just avoids rendering the provider.

## [0.2.0] 2025-8-19

### Changed

- Updated `@valence-protocol/domain-clients-core` dependency to 0.2.0

## [0.1.0] 2025-08-18

### Added

- Provider components for client configuration
- Hooks to access clients and configuration
