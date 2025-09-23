# Contributing

Do all operations inside `nix develop`.

## Branches

- `main` for stable, published code
- `feature/<name>` for per-feature branches off `main`

## Contributing to packages

This project uses [changesets](https://github.com/changesets/changesets) to document changes and manage releases to npm.

Each package change must be accompanied with a changeset entry.

To add a changeset to your PR:

```bash
nix develop
pnpm changeset
## run individually for each package
## write description (you can edit it in the file system later)
## commit file
```

Please use this format for writing changesets:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## Releasing packages

### Steps

1. Run the github action `Version Packages`

- If there are changesets in the `.changesets` folder, the action will bump all versions and open a PR.
- Review the PR (carefully!) to make sure all versions are accurate. It is safe to pull the branch and make edits to version numbers
- Merge the PR

2. Run the github action `Release Packages`

- This will build all packages with their dependencies, and push the bundles to npm with the version specified in their `package.json`
