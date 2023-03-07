import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, GradientTypography } from "elements";
import theme from "theme";

const IdenfySuccessSession: FunctionComponent = () => {
  const handleClick = () => {
    window.postMessage("idenfy-verification-success");
  };

  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        flexGrow: 1,
        justifyContent: "center",
      } }
    >
      <Typography variant="h1">CONGRATS!</Typography>
      <GradientTypography
        style={ { ...theme.typography.emphasized } }
        variant="h1"
      >
        You&apos;re now verified.
      </GradientTypography>
      <Typography
        sx={ {
          alignItems: "ceneter",
          columnGap: 1.5,
          display: "flex",
          fontWeight: 400,
          my: [2, 3, 4],
        } }
      >
        <CheckCircleIcon color="success" />
        You can now mint your songs and claim royalties.
      </Typography>
      <Button onClick={ handleClick }>Got it</Button>
    </Stack>
  );
};

export default IdenfySuccessSession;
