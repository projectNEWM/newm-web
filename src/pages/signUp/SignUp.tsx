import { extendedApi as sessionApi } from "modules/session";
import NEWMLogo from "assets/images/NEWMLogo";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

const SignUp: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleGoogleRespSuccess = (
    resp: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      const onlineResponse = resp as GoogleLoginResponse;
      const accessToken = onlineResponse.accessToken;

      dispatch(sessionApi.endpoints.googleLogin.initiate({ accessToken }));
    } catch (e) {
      console.log("Google authentication service offline");
    }
  };

  const handleGoogleRespFailure = () => {
    console.log("Google authentication failed");
  };

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

          <Box mt={ 11 } mb={ 2 }>
            <Typography
              align="center"
              variant="h5"
              sx={ { color: theme.palette.primary.main } }
            >
              Welcome
            </Typography>
          </Box>

          <Typography variant="body2" align="center">
            Or sign in with
          </Typography>

          <Box
            mt={ 1 }
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <GoogleLogin
              clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID || "" }
              render={ (renderProps) => (
                <IconButton
                  onClick={ renderProps.onClick }
                  disabled={ renderProps.disabled }
                >
                  <GoogleIcon style={ { fill: "white" } } />
                </IconButton>
              ) }
              onSuccess={ handleGoogleRespSuccess }
              onFailure={ handleGoogleRespFailure }
              cookiePolicy={ "single_host_origin" }
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
