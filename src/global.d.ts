declare module "*.png" {
  const value: never;
  export = value;
}

declare module "*.svg" {
  const value: never;
  export = value;
}

declare module "cloudinary-react";
declare module "react-transition-group";
declare module "styled-components";
declare module "moment-duration-format";
declare module "moment";
declare module "react-facebook-login/dist/facebook-login-render-props";

interface Window {
  readonly cardano?: any; // eslint-disable-line
  Wallets?: any; // eslint-disable-line
}
