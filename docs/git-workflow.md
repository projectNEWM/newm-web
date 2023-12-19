## Git workflow

This repo uses a continuous delivery workflow. This enables code to be deployed
to production at any time if neccessary and simplifies the release process.

### Workflow diagram

<img width="1039" alt="git-workflow" src="https://github.com/projectNEWM/newm-web/assets/5877597/c7d82247-e0a3-4136-9b23-2e29a0b9e181">

In the above diagram, branches are categorized as follows:

#### Master branch

The master branch contains production ready code.

#### Story branches

Story branches are for work items that could be presented to users as
soon as they're merged into master.

#### Feature branches

Feature branches are for work that cannot be completed in a single ticket.
They can be merged into master once the work is at a state where it could
be presented to users.

#### Release branches

These are very short lived branches that correspond to a tagged commit which
is deployed to production. They should contain minimal changes and are largely
just to create a snapshot of the master branch so that work can continue
without affecting the release.
