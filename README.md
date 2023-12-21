# NEWM Web

This monorepo contains the NEWM web applications and shared packages.

## Primary open source libraries

- [React](https://react.dev/) - Library for web user interfaces
- [Next.js](https://nextjs.org/) - Library for building full stack React applications
- [Redux Toolkit](https://redux-toolkit.js.org/) - Toolset for efficient Redux development
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - Data fetching and caching tool
- [Nx](https://nx.dev) - Build system with monorepo support

## Development

The repo is split into `apps` and `packages`. Apps are deployable applications
and packages are libraries with shared functionality.

### Running the apps locally

First install the NPM packages from the root directory:

```
npm install
```

The following commands will then run each app:

- NEWM Studio: `nx serve studio` (runs at `http://localhost:3000`)
- NEWM Marketplace: `nx serve marketplace` (runs at `http://localhost:4200`)

## Nx

This repo leverages Nx for building apps and packages.

### Generating code

You can utilize generators to create new apps and packages.

Run `nx list` to get a list of available plugins and whether they have
generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about Nx generators [in the docs](https://nx.dev/plugin-features/use-code-generators).

### Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn
more [in the docs](https://nx.dev/core-features/run-tasks).

### Editor Integration

The [Nx Console extensions](https://nx.dev/nx-console). It provides
autocomplete support, a UI for exploring and running tasks & generators, and
more.

## Storybook

The storybook for the elements package can be run using the command

```
nx storybook elements
```

## Additional resources

- [Deploy to production](./docs/deploy-release.md)
- [Git workflow](./docs/git-workflow.md)
