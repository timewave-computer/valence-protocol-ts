# Contributing

## Branches

- `main` for stable, published code
- `next` for new, unreleased features
- `feature/<name>` for per-feature branches off `next`
- `release/<name>` for releases, or `patch/name` for direct updates to main

## Contributing to packages

Each package change must be accompanied with an `Unreleased` changelog line.

Types of changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## Releasing packages.

### Steps

1. Open a PR to merge `next` into `main`. Can do regular merge, do not squash the commits. Review and merge.

2. Set up release environment

```bash
git checkout main
git pull origin
git checkout -b release/<name>
pnpm install
turbo build
```

3. `cd` into package root

4. Generate new version

```bash
# Patch release (0.0.1 → 0.0.2)
# backward-compatible bug fixes
npm version patch

# Minor release (0.0.1 → 0.1.0)
# backward-compatible new features
npm version minor

# Major release (0.1.0 → 1.0.0)
# backward-incompatible changes
npm version major

# Or set an exact version
npm version 0.2.0
```

5. Update `CHANGELOG.md` with new version.

6. Publish to npm

**Note:** You must have write access to the npm scope `@valence-protocol`. Run the publish command and follow the prompts to authenticate yourself via CLI.

```bash
cd <package root>
npm publish --access public
```

7. Add new versions to `pnpm.overrides` in root package.json

8. Open a PR from your `release/name` branch -> `main` with:

- migrated changelog
- package `version` updated in package.json
- new version added to root package.json `pnpm.overrides` (for app deployment with correct dependencies)

9. Reset `next` branch

```bash
git checkout next
git merge origin/main
git push origin next
```
