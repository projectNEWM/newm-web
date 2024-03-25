"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface ItemHeaderProps {
  readonly title: string;
}

const ItemHeader: FunctionComponent<ItemHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <Stack direction="row" px={ [2, 2, 7.5] } py={ [2, 2, 7.5] } spacing={ 4 }>
      <Button
        color="white"
        variant="outlined"
        width="icon"
        onClick={ () => router.back() }
      >
        <ArrowBackIcon sx={ { color: "white" } } />
      </Button>

      <Typography variant="h3">{ title }</Typography>
    </Stack>
  );
};

export default ItemHeader;
