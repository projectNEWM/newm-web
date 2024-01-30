import "./global.css";
import { StyledComponentsRegistry } from "./registry";

export const metadata = {
  description: "Generated by create-nx-workspace",
  title: "Welcome to demo2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{ children }</StyledComponentsRegistry>
      </body>
    </html>
  );
}