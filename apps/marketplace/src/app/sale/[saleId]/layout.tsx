import { FunctionComponent, ReactNode } from "react";
import { GetSalesResponse } from "../../../modules/sale";
import { baseUrls } from "../../../buildParams";

interface SongLayoutProps {
  readonly children: ReactNode;
}

export const generateStaticParams = async () => {
  const resp = await fetch(`${baseUrls.newm}/v1/marketplace/sales`);
  const data: GetSalesResponse = await resp.json();

  return data.map(({ id }) => ({ saleId: id }));
};

const Layout: FunctionComponent<SongLayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
