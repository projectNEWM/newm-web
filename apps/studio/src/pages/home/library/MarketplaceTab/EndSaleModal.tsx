import { FunctionComponent } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Button, Modal } from "@newm-web/elements";
import theme from "@newm-web/theme";

interface EndSaleModalProps {
  readonly handleClose: () => void;
  readonly handleEndSale: () => void;
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly isSoldOut?: boolean;
}

export const EndSaleModal: FunctionComponent<EndSaleModalProps> = ({
  handleClose,
  isOpen,
  handleEndSale,
  isLoading,
  isSoldOut = false,
}) => {
  return (
    <Modal isCloseButtonVisible={ false } isOpen={ isOpen } onClose={ handleClose }>
      <Box
        alignItems="center"
        alignSelf="center"
        display="flex"
        flex={ 1 }
        justifyContent="center"
        maxWidth={ 600 }
      >
        <Stack
          gap={ 2 }
          sx={ {
            background: theme.colors.grey600,
            pb: 2,
            pt: 3,
            px: 3,
            textAlign: "center",
            width: "90%",
          } }
        >
          <Stack gap={ 1 } textAlign="start">
            <Typography variant="body2">
              Are you sure you want to end your stream token sale?
            </Typography>

            { isSoldOut ? (
              <Typography variant="subtitle2">
                All earnings from your sold out stream token sale will be moved
                to your wallet.
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                The sale will be removed from the Marketplace, and all unsold
                stream tokens will be returned to the wallet used when creating
                the sale.
              </Typography>
            ) }
          </Stack>
          <Stack flexDirection="row" gap={ 1 } justifyContent="end" mt={ 1 }>
            <Button
              color="music"
              disabled={ isLoading }
              variant="secondary"
              width="compact"
              onClick={ handleClose }
            >
              Cancel
            </Button>
            <Button
              disabled={ isLoading }
              width="compact"
              onClick={ handleEndSale }
            >
              Yes, end
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
