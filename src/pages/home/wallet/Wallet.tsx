import { FunctionComponent } from "react";
import { Box, Button, Container } from "@mui/material";
import { Typography } from "elements";
import theme from "theme";

const Wallet: FunctionComponent = () => {
  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginLeft: [null, null, 4.5],
        overflow: "auto",
        paddingY: 7.5,
        textAlign: ["center", "initial"],
      } }
    >
      <Typography variant="h3" fontWeight={ 800 } mb={ 5 }>
        WALLET
      </Typography>
      <Box
        sx={ {
          backgroundColor: theme.colors.grey600,
          padding: 2.5,
          maxWidth: "400px",
          height: "100px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between"
        } }
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        
        >
          <Typography color="grey100" fontSize={ 12 }>
            UNCLAIMED ROYALTIES
          </Typography>
          <Typography fontSize= "28px" fontWeight={ 700 }>
            $5.35
          </Typography>
        </Box>
        <Button
          sx={ {
            borderRadius: "4px",
            border: "2px solid #FFFFFF",
            height: "35px",
            alignSelf: "center",
          } }
          variant="outlined"
          color="inherit"
        >
          CLAIM ROYALTIES
        </Button>
      </Box>
    </Container>
  );
};

export default Wallet;
