import { FunctionComponent, ReactNode } from "react";

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

const mockArtists = [
  {
    firstName: "Johnny",
    id: "abcd1234",
    lastName: "Appleseed",
  },
];
