/**
 * Favicon component for including standard favicon and branding images.
 * NOTE: Ensure that the corresponding favicon files (e.g., favicon-dark.ico, favicon-32x32.png)
 * are placed in the `public` directory of your app for proper rendering.
 */
const Favicon = () => {
  return (
    <>
      <link
        href="/favicon-dark.ico"
        media="(prefers-color-scheme:dark)"
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link
        href="/favicon-light.ico"
        media="(prefers-color-scheme:light)"
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link color="#dc3caa" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#603cba" name="msapplication-TileColor" />
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
    </>
  );
};

export default Favicon;
