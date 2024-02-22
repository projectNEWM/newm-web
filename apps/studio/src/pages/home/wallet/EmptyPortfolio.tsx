import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Suitcase } from "@newm-web/assets";
import { Button } from "@newm-web/elements";

export const EmptyPortfolio: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" mt={ 17.5 } rowGap={ 1.5 }>
      <Suitcase />
      <Typography fontWeight={ 700 } mt={ 0.5 } variant="h4">
        Your portfolio is empty
      </Typography>
      <Typography fontSize="14px" fontWeight={ 400 } variant="h4">
        All distributed and minted songs will be shown here
      </Typography>
      <Button
        color="music"
        sx={ { mt: 1.5 } }
        variant="secondary"
        width="compact"
        onClick={ () => navigate("/home/upload-song") }
      >
        Distribute & mint your first song!
      </Button>
    </Stack>
  );
};
