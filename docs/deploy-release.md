## Deploy release to production

1. Create a new release branch off of master at the commit where code should be
   deployed. The branch name should be prefixed with `release/` and include the
   names and versions of the apps to be deployed. For example, a release branch
   for versions 1.0.0 of studio and 1.2.0 of marketplace would
   be `release/studio-1.0.0-marketplace-1.2.0`.
2. Increment the versions for the apps in the app `package.json` files.
3. Create a PR for the branch.
4. When the PR is merged into master, Github workflows will automatically
   create a Github release and deploy the app to production.
