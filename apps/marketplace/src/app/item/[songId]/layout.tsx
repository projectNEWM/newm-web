import { FunctionComponent, ReactNode } from "react";
import { SalesResponse } from "../../../modules/sale";
import { baseUrls } from "../../../buildParams";

interface SongLayoutProps {
  readonly children: ReactNode;
}

export const generateStaticParams = async () => {
  const resp = await fetch(`${baseUrls.newm}/v1/marketplace/sales`);
  const data: SalesResponse = await resp.json();

  return data.map(({ id }) => ({ songId: id }));
};

const Layout: FunctionComponent<SongLayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
