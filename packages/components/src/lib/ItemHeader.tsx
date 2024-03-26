"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { FunctionComponent } from "react";

interface ItemHeaderProps {
  readonly onGoBack: VoidFunction;
  readonly title: string;
}

const ItemHeader: FunctionComponent<ItemHeaderProps> = ({
  onGoBack,
  title,
}) => {
  return (
    <Stack direction="row" spacing={ 4 }>
      <Button color="white" variant="outlined" width="icon" onClick={ onGoBack }>
        <ArrowBackIcon sx={ { color: "white" } } />
      </Button>

      <Typography variant="h3">{ title }</Typography>
    </Stack>
  );
};

export default ItemHeader;
