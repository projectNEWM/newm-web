import NEWMLogo from "assets/images/NEWMLogo";
import { useAuthenticatedRedirect } from "common";
import { FunctionComponent } from "react";
import { Typography } from "elements";
import { FacebookLogin, GoogleLogin, LinkedInLogin } from "components";
import { Box, Container, Stack, useTheme } from "@mui/material";

const SignUp: FunctionComponent = () => {
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

          <Box mt={ 2 } display="flex" justifyContent="center">
            <Typography fontWeight="semi-bold" align="center">
              Or sign up via
            </Typography>
          </Box>

          <Box
            mt={ 1 }
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={ 2 }>
              <GoogleLogin />
              <FacebookLogin />
              <LinkedInLogin />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
