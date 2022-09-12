import { Box, Container, Stack } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent } from "react";
import theme from "theme";
import mursProfileImageLg from "assets/images/murs-profile-cut-tinified.png";
import mursProfileImageSm from "assets/images/murs-profile-cropped.png";
import { useWindowDimensions } from "common";

const TokenDrop: FunctionComponent = () => {
  const { width = 0 } = useWindowDimensions() || {};

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black100,
        flexDirection: "column",
        flexGrow: 1,
      } }
    >
      <Box
        sx={ {
          display: ["none", "none", "flex"],
          position: "fixed",
          bottom: 0,
          right: 0,
          height: ["100%", "100%", width * 0.5, "100%"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageLg }
          style={ { height: "100%" } }
        />
      </Box>

      <Box
        sx={ {
          display: ["flex", "flex", "none"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageSm }
          style={ { width: "100%" } }
        />
      </Box>

      <Container maxWidth={ false }>
        <Box
          width={ ["100%", "100%", "60%"] }
          maxWidth="60rem"
          paddingTop={ [4, 4, 12] }
          paddingLeft={ [1, 1, 10] }
          paddingRight={ [1, 1, 0] }
        >
          <Stack spacing={ 1 } sx={ { marginBottom: 4 } }>
            <Typography variant="h1" fontSize={ 100 } lineHeight="80px">
              MURS
            </Typography>
            <Typography
              variant="h3"
              color="pink"
              sx={ theme.typography.emphasized }
            >
              Moodswingz Cryptomedia Group
            </Typography>

            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
              nibh sit amet mi euismod pulvinar. Maecenas pulvinar lorem vel
              erat efficitur, interdum ultrices magna ullamcorper. Nam imperdiet
              nibh semper eros iaculis dictum. Donec non sapien sit amet tortor
              tincidunt varius. Etiam hendrerit, felis eleifend maximus
              ultricies, ligula eros maximus enim, non congue quam nisl id
              turpis. Ut eget fermentum massa. Proin fermentum porttitor ipsum
              sit amet interdum. Vestibulum lacinia sagittis malesuada. Fusce
              eget feugiat sapien. Proin eu sem vitae tortor sagittis ornare.
              Quisque tempus libero id accumsan sodales. Vivamus quam mi,
              molestie a lobortis maximus, bibendum nec nunc.
            </Typography>
          </Stack>

          <FilledButton>Buy</FilledButton>
        </Box>
      </Container>
    </Box>
  );
};

export default TokenDrop;
