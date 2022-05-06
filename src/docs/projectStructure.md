## Project Structure

The project is organized into the following directory structure. The Structure
is meant to be fluid and can be reorganized as necessary.

Test and story directories should be placed at the top level of each directory.

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
