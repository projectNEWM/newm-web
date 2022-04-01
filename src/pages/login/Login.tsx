import NEWMLogo from "assets/images/NEWMLogo";
import { useAuthenticatedRedirect } from "common";
import { FunctionComponent } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";

const Login: FunctionComponent = () => {
  const theme = useTheme();

  useAuthenticatedRedirect();

  return (
    <Container
      maxWidth="lg"
      sx={ {
        display: "flex",
        minHeight: "100%",
        backgroundColor: theme.palette.background.default,
        justifyContent: "center",
        alignItems: "center",
      } }
    >
      <Box width="312px">
        <Box
          sx={ {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "stretch",
          } }
        >
          <Box alignSelf="center">
            <NEWMLogo />
          </Box>

          <Box mt={ 11 }>
            <Typography
              align="center"
              variant="h5"
              sx={ { color: theme.palette.primary.main } }
            >
              Login placeholder
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
