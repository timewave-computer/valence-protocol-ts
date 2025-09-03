# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] YYYY-MM-DD

### Changed

- [breaking] changed naming conventions in clients to use `query` if fetching data

### Added

- Signing and public clients for solana
- Config constructor for solana
- _Breaking_ require `hide` prop to determine if to show domain in modal. This is a temporary solution

### Fixed

- Decimal math (converting from micro to base units) should not lose precision

## [0.2.0] 2025-08-19

### Changed

- _Breaking_ require default chain ID for evm config

## [0.1.0] 2025-08-18

### Added

- Core clients for interacting with cosmos and ethereum chains. Both read and write use cases.
- Client config definitions and types
- Domain-specific utilities
