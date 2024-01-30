## MUI & Next.js Integration

### Theming

There are currently issues with MUI and Next.js around theming. The MUI theme
functions occur on the client, which makes it impossible to use them with
server-side rendering. This [open Material UI PR](https://github.com/mui/material-ui/issues/39010)
outlines the issue.

Until the issue is resolved, Next.js files in the `app` directory require
"use client" to be at the top of any file that references the theme. When the
issue is resolved on the MUI side, that line can be removed.
