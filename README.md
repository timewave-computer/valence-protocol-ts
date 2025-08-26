# Valence Protocol Turborepo

This repository is a [Turborepo](https://turbo.build/) monorepo managed with [pnpm](https://pnpm.io/).

## Prerequisities

1. **NixOs**
   This codebase uses Nix to create a reproducible development environment.
   [https://nixos.org/download/](https://nixos.org/download/)

## Getting Started

1. **Install dependencies:**

   ```sh
   nix develop
   ```

   This will create an isolated development environment. Run project commands within the nix shell.

2. **Run builds:**

   ```sh
   turbo build
   ```

   This will run the `build` pipeline for all packages and apps using Turborepo.

3. **Run linting:**

   ```sh
   turbo lint
   ```

   Husky will automatically format files on commit. Run manually on staged files with `pnpm lint-staged`, or `pnpm prettier --write .` to format all.

4. **Run tests:**
   ```sh
   turbo test
   ```

## Adding Packages or Apps

- Place new packages in the `packages/` directory.
- Place new apps in the `apps/` directory.
- Each package or app should have its own `package.json`.

## Useful Turborepo Commands

- `turbo build` — Run the build pipeline across the monorepo
- `turbo lint` — Run linting across the monorepo
- `turbo test` — Run tests across the monorepo

For more, see the [Turborepo docs](https://turbo.build/repo/docs) and [pnpm docs](https://pnpm.io/).

## Working with turborepo

### Add dependency to a package

```bash
pnpm install <X> --filter @valence-protocol/domain-clients-core

pnpm install <X> --filter @valence-protocol/domain-clients-react
```

### Build a package

```bash
turbo build --filter @valence-protocol/domain-clients-core

turbo build --filter @valence-protocol/domain-clients-react
```

### Run apps

Start apps in development mode.

```bash
turbo dev

turbo dev --filter @valence-protocol/domain-clients-example
```
