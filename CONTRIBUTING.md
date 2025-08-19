# Contributing

## Contributing to packages

Each package change must be accompanied with an `Unreleased` changelog line.

Types of changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## Releasing a package

1. `turbo build` to build all packages

2. `cd` into package root

3. Generate new version

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

4. Update `CHANGELOG.md` with new version.

5. Publish to npm

**Note:** You must have write access to the npm scope `@valence-protocol`. Run the publish command and follow the prompts to authenticate yourself via CLI.

```bash
cd <package root>
npm publish --access public`
```
