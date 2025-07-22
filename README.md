# Valence Protocol Turborepo

This repository is a [Turborepo](https://turbo.build/) monorepo managed with [pnpm](https://pnpm.io/).

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```

2. **Run builds:**
   ```sh
   pnpm build
   ```
   This will run the `build` pipeline for all packages and apps using Turborepo.

3. **Run linting:**
   ```sh
   pnpm lint
   ```

4. **Run tests:**
   ```sh
   pnpm test
   ```

## Adding Packages or Apps

- Place new packages in the `packages/` directory.
- Place new apps in the `apps/` directory.
- Each package or app should have its own `package.json`.

## Useful Turborepo Commands

- `pnpm turbo run build` — Run the build pipeline across the monorepo
- `pnpm turbo run lint` — Run linting across the monorepo
- `pnpm turbo run test` — Run tests across the monorepo

For more, see the [Turborepo docs](https://turbo.build/repo/docs) and [pnpm docs](https://pnpm.io/).
