## Deploy release to production

1. Create a new release branch off of master at the commit where code should be
   deployed. The branch name should follow the convention
   `release/{app-prefix}/{version}`. For example, the release branch for the
   initial release of NEWM Studio would be `release/studio/1.0.0`.
   - The `app-prefix` can be one of two values:
     - `newm` for NEWM Studio
     - `marketplace` for NEWM Marketplace
2. Perform any testing for the release in the release branch.
3. Merge additional changes or fixes into the release branch as required.
4. Navigate to the [create release page](https://github.com/projectNEWM/newm-web/releases/new)
   for the repo.
5. When choosing a tag, create a new tag for the release with the format
   `{app-prefix}-{version}`. The `app-prefix` value determines which app is
   deployed. For example, the initial studio release tag would be `studio-1.0.0`.
6. Set the recently created release branch as the target.
7. Add a release title and description.
8. Publish the release to deploy the release branch to production.
9. If it's preferable to not have the release deploy right away, select the
   `Set as pre-release` checkbox, and publish the release at a later date to
   deploy it.
10. Merge the release branch back into master if additional changes were made.
