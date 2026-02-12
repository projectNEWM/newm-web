/**
 * * Fixed position background image with darkened overlay.
 */

import { ReactNode } from "react";

import { useFlags } from "launchdarkly-react-client-sdk";

import { styled } from "@mui/material/styles";
import { useBrowserSupport } from "@newm-web/utils";

interface BackgroundProps {
  children: ReactNode;
}

const BackgroundImage = styled("div")({
  backgroundImage: "url(\"https://i.postimg.cc/TPTmSRWB/bg-img.png\")",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  display: "flex",
  flexGrow: 1,
  height: "100%",
  position: "relative",
  width: "100%",
});

const BackgroundOverlay = styled("div")<{ applyOffset?: boolean }>(
  ({ theme, applyOffset }) => ({
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    bottom: 0,
    display: "flex",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    // TODO(webStudioDisableDistributionAndSales): Remove the below breakpoint logic once the feature flag is removed.
    ...(applyOffset && {
      [theme.breakpoints.down("xl")]: {
        [theme.breakpoints.up(960)]: {
          top: theme.spacing(2), // * 16px with default 8px spacing.
        },
      },
    }),
  })
);

const Background = ({ children }: BackgroundProps) => {
  const { webStudioDisableDistributionAndSales } = useFlags();
  const { isFullSupport } = useBrowserSupport();

  const applyOffset = webStudioDisableDistributionAndSales && isFullSupport;

  return (
    <BackgroundImage>
      <BackgroundOverlay applyOffset={ applyOffset }>
        { children }
      </BackgroundOverlay>
    </BackgroundImage>
  );
};

export default Background;
