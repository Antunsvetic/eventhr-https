# Changesets

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

## Adding a changeset

When you make a change that should be included in the next release, run:

```bash
npm run changeset
```

This will prompt you to:
1. Select which packages have changed (this is a single-package repo)
2. Choose the type of change: `major`, `minor`, or `patch`
3. Add a summary of the changes

This creates a `.changeset/{hash}.md` file in the `.changeset` folder.

## Versioning and publishing

When you're ready to release:

1. Ensure all changesets have been merged to the `develop` branch
2. Run `npm run changeset:version` to update the version in `package.json` and generate a CHANGELOG
3. Commit these changes
4. Run `npm run changeset:publish` to publish to npm

This process is automated via GitHub Actions when changesets are merged to `develop`.
