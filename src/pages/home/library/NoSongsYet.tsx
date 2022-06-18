import { FunctionComponent } from "react";
import { Box, IconButton } from "@mui/material";
import { Typography } from "elements";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

const NoSongsYet: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      } }
    >
      <Typography
        fontWeight="bold"
        fontSize="20px"
        paddingBottom={ 2 }
        paddingTop={ 5 }
      >
        You have no songs yet
      </Typography>
      <Typography fontWeight="regular" fontSize="14x">
        Click below to upload your first song
      </Typography>
      <IconButton>
        <AddCircleOutlineOutlinedIcon
          onClick={ () => navigate("/home/upload-song") }
          fontSize="large"
        />
      </IconButton>
    </Box>
  );
};

export default NoSongsYet;
