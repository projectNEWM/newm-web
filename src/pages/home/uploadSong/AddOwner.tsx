import { FunctionComponent, useState } from "react";
import { HorizontalLine, TransparentButton, Typography } from "elements";
import { IconButton, Stack, useTheme } from "@mui/material";
import { ProfileImage, TextInputField } from "components";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import AddOwnerModal from "./AddOwnerModal";

const AddOwner: FunctionComponent = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HorizontalLine sx={ { marginTop: theme.spacing(4) } } />

      <Stack
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
          marginTop: theme.spacing(4),
        } }
      >
        <Stack>
          <Typography color="grey100">IP RIGHTS OWNERS</Typography>

          <Stack
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 2.5,
              marginTop: theme.spacing(1.5),
            } }
          >
            <ProfileImage
              alt="Owner"
              src="http://placecorgi.com/42"
              height={ 42 }
              width={ 42 }
            />
            <Stack sx={ { display: "flex", flexDirection: "cloumn", gap: 0.5 } }>
              <Typography>Miah May</Typography>
              <Typography variant="subtitle1">email@email@gmail.com</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <Typography
            color="grey100"
            id="equity"
            sx={ { display: ["none", "none", "block"] } }
          >
            EQUITY
          </Typography>

          { /* Change the following block to render dynamically when data is avaialble */ }
          <Stack
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 2.5,
              marginTop: theme.spacing(1.5),
            } }
          >
            <TextInputField
              aria-labelledby="equity"
              defaultValue={ 100 }
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={ {
                    color: theme.colors.white,
                    marginRight: theme.spacing(1),
                  } }
                >
                  <Typography>%</Typography>
                </InputAdornment>
              }
              max="100"
              min="1"
              name="Owner"
              type="number"
            />
            <IconButton>
              <CloseIcon sx={ { color: theme.colors.white } } />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      <HorizontalLine sx={ { marginTop: theme.spacing(4) } } />

      <Stack sx={ { display: "flex", marginTop: theme.spacing(4) } }>
        <Typography color="grey100">CREDITS TO SHOW ON SONG DETAILS</Typography>

        { /* Change the following block to render dynamically when data is avaialble */ }
        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing(1.5),
          } }
        >
          <Stack
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 2.5,
            } }
          >
            <ProfileImage
              alt="Creditor"
              src="http://placecorgi.com/42"
              height={ 42 }
              width={ 42 }
            />
            <Stack sx={ { direction: "row", gap: 0.5 } }>
              <Typography>Miah May</Typography>
              <Typography variant="subtitle1">email@email@gmail.com</Typography>
            </Stack>
          </Stack>

          <IconButton>
            <CloseIcon sx={ { color: theme.colors.white } } />
          </IconButton>
        </Stack>
      </Stack>

      <HorizontalLine sx={ { marginTop: theme.spacing(4) } } />

      <TransparentButton
        sx={ {
          border: `2px dashed ${theme.colors.grey400}`,
          marginTop: theme.spacing(4),
          width: "100%",
        } }
        onClick={ () => {
          setIsModalOpen(true);
        } }
      >
        Add new
      </TransparentButton>

      <AddOwnerModal
        open={ isModalOpen }
        onClose={ () => {
          setIsModalOpen(false);
        } }
      />
    </>
  );
};

export default AddOwner;
