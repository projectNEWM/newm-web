import { useRouter } from "next/navigation";
import { Grid, Stack } from "@mui/material";
import { NEWMMarketplaceLogo } from "@newm-web/assets";
import { FunctionComponent } from "react";
import { HorizontalLine } from "@newm-web/elements";
import ConnectWallet from "./ConnectWallet";
import { Search } from "./Search";

const Header: FunctionComponent = () => {
  const router = useRouter();

  return (
    <>
      <Grid
        sx={ {
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: [2, 2, 4],
          justifyContent: "space-between",
        } }
      >
        <Stack
          sx={ {
            alignItems: "flex-start",
            flex: [0, 0, 1],
            ml: [2, 2, 7.5],
            mt: [2, 2, 3.5],
          } }
        >
          <NEWMMarketplaceLogo
            aria-label="Navigate to home page"
            role="button"
            sx={ {
              cursor: "pointer",
              minHeight: ["48px", "64px", "64px"],
              minWidth: ["126px", "168px", "168px"],
            } }
            tabIndex={ 0 }
            onClick={ () => router.push("/") }
          />
        </Stack>

        <Stack
          sx={ {
            alignItems: "center",
            flex: 1,
            flexBasis: ["100%", "100%", "auto"],
            mt: [0, 2, 3.5],
            order: [4, 4, 2],
          } }
        >
          <Search />
        </Stack>

        <Stack
          sx={ {
            alignItems: "flex-end",
            flex: 1,
            mr: [2, 2, 7.5],
            mt: [2, 2, 3.5],
            order: [2, 2, 3],
          } }
        >
          <ConnectWallet />
        </Stack>

        <HorizontalLine
          sx={ {
            flex: 1,
            flexBasis: "100%",
            height: "2px",
            order: [3, 3, 4],
          } }
        />
      </Grid>
    </>
  );
};

export default Header;
