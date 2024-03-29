import { FunctionComponent, ReactNode } from "react";
import { mockSongs } from "../../../temp/data";

interface SongLayoutProps {
  readonly children: ReactNode;
}

export const generateStaticParams = async () => {
  return mockSongs.map(({ id }) => ({ songId: id }));
};

const Layout: FunctionComponent<SongLayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
