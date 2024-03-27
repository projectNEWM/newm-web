import { FunctionComponent, ReactNode } from "react";
import { mockArtists } from "../../../temp/data";

interface ArtistLayoutProps {
  readonly children: ReactNode;
}

export const generateStaticParams = async () => {
  return mockArtists.map(({ id }) => ({ id }));
};

const Layout: FunctionComponent<ArtistLayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
