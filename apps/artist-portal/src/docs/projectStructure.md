## Project Structure

The project is organized using the following structure. It is meant to be
fluid and can be updated as necessary.

- #### api

  - Files to set up the RTK Query API.

- #### assets

  - Static resource files for the app (images, SVG, etc...).

- #### common

  - Util and Redux functionality that isn't specific to a module.

- #### components

  - Components that are used in multiple places throughout the app. Organized into
    directories based on functionality or by page.

- #### elements

  - The basic building blocks of the app. This serves as the component library for
    the app and is largely Material UI library components that need to be modified
    to fit the app functionality and / or design.

- #### modules

  - Individual directories corresponding to a slice of the Redux app state.
    All files for a specific state slice should be grouped in a single directory
    (e.g. type definitions, state slice, api endpoints, etc...).

- #### pages

  - Non-reusable page components for the app. Pages can be divided into
    sub-sections in order to better organize the code.

- #### theme

  - Files related to the app theme.

### Exports

All exports should exported from the index.ts file at the top level of each
directory. Two exceptions are the "@newm.io/studio/modules" and "@newm.io/studio/pages" directories. The
"@newm.io/studio/modules" directory should have exports exported from the top level of each
module directory (e.g. `modules/session`), and the "@newm.io/studio/pages" directory should have
a single export at the top level of each page directory (e.g. `pages/home`).

### Tests

Test files should be placed in a "test" directory at the top level of each
directory, except for the "@newm.io/studio/modules" and "@newm.io/studio/pages" directories, where they should
be placed at the top level of each module or page directory.

### Stories

Story files should be placed in a "story" directory at the top level of the
"@newm.io/studio/elements" and "@newm.io/studio/components" directories.
