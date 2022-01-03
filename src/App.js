import './App.css';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { Header } from './components/header';
import { Content } from './components/content';
import { Box, CssBaseline } from '@mui/material';

// Design: https://xd.adobe.com/view/2cb4c8ee-234a-46cc-b2d2-683e9ae7031c-79e7/ 

const StyledBackground = styled('div')({
  backgroundImage: `url("https://i.postimg.cc/TPTmSRWB/bg-img.png")`,
  height: "100%",
  position: "absolute",
  left: 0,
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#707070",
      purple: "#CC33CC",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 14,
    body1: {
      fontFamily: "Montserrat",
      fontSize: 14,
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: 30,
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: 12,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBackground>
        <Box sx={{}}>
          <Header />
        </Box>
        <Content />
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;