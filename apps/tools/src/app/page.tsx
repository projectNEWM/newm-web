"use client";
import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { WalletIcon } from "@newm-web/assets";
import theme from "@newm-web/theme";

interface Tool {
  readonly Icon: FunctionComponent;
  readonly description: string;
  readonly name: string;
  readonly path: string;
  readonly title: string;
}

const NEWM_TOOLS: Tool[] = [
  {
    Icon: WalletIcon,
    description:
      "After connecting, you will be able to connect your wallet to the mobile app",
    name: "wallet-connect",
    path: "/wallet-connect",
    title: "Connect your wallet",
  },
];

const Page: FunctionComponent = () => {
  return (
    <Stack aria-label="NEWM Tools" mt={ 4 } role="group">
      <Stack component="ul" display="grid" gap={ 3 } pl={ 0 }>
        { NEWM_TOOLS.map(({ description, Icon, name, path, title }) => {
          return (
            <Stack
              component="li"
              key={ name }
              sx={ {
                background: theme.gradients.crypto,
                borderRadius: "8px",
                maxWidth: "292px",
                padding: "1px",
              } }
            >
              <Stack
                aria-describedby={ `${name}-description` }
                aria-labelledby={ `${name}-title` }
                component={ "a" }
                href={ path }
                sx={ {
                  "&:hover, &:active, &:focus": {
                    opacity: 0.85,
                  },
                  alignItems: "center",
                  backgroundColor: theme.colors.black,
                  borderRadius: "8px",
                  cursor: "pointer",
                  gap: 0.5,
                  justifyContent: "center",
                  minWidth: "210px",
                  p: 2.5,
                } }
                target="_blank"
              >
                <Icon />
                <Typography
                  component="h3"
                  fontWeight={ 500 }
                  id={ `${name}-title` }
                  sx={ { mt: 2 } }
                >
                  { title }
                </Typography>
                <Typography
                  id={ `${name}-description` }
                  mt={ 0.5 }
                  variant="subtitle1"
                >
                  { description }
                </Typography>
              </Stack>
            </Stack>
          );
        }) }
      </Stack>
    </Stack>
  );
};

export default Page;
