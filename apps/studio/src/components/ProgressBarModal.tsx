import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Modal } from "@newm-web/elements";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import {
  clearProgressBarModal,
  selectUi,
  setIsProgressBarModalOpen,
} from "../modules/ui";
import { useAppDispatch } from "../common";

const ProgressBarModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const {
    isProgressBarModalOpen,
    progressBarModal: { progress, message, disclaimer, animationSeconds },
  } = useSelector(selectUi);

  const handleClose = () => {
    dispatch(setIsProgressBarModalOpen(false));
    dispatch(clearProgressBarModal());
  };

  return (
    <Modal
      isCloseButtonVisible={ false }
      isOpen={ isProgressBarModalOpen }
      onClose={ handleClose }
    >
      <Box alignItems="center" display="flex" flex={ 1 } justifyContent="center">
        <Stack
          gap={ 2 }
          sx={ {
            background: theme.colors.grey600,
            padding: 2,
            textAlign: "center",
            width: "90%",
          } }
        >
          <ProgressBar
            animationSeconds={ animationSeconds }
            progress={ progress }
          />

          <Stack gap={ 1 }>
            <Typography
              sx={ { color: theme.colors.white, fontStyle: "italic" } }
              variant="subtitle1"
            >
              { message }
            </Typography>

            { !!disclaimer && <Typography>{ disclaimer }</Typography> }
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProgressBarModal;
