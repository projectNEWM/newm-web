import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { supportedWallets, walletInfo } from "modules/wallet";
import { ButtonProps, Stack, useTheme } from "@mui/material";
import { SelectWalletItem } from "components";
import { browserName } from "react-device-detect";
import {
  Dialog,
  DialogProps,
  FilledButton,
  OutlinedButton,
  Typography,
} from "elements";
import { FormikValues, useFormikContext } from "formik";

interface MintSongModalProps extends Omit<DialogProps, "onClose"> {
  /** Called when the modal is closed */
  readonly onClose: VoidFunction;
  /** Called when declining to mint an NFT */
  readonly onCancel: VoidFunction;
  /** Called when selecting a wallet to min the NFT */
  readonly onConfirm: (walletId: string) => void;
}

export interface Button extends ButtonProps {
  readonly buttonType: "outlined" | "filled";
}

interface DialogContent {
  readonly title: string;
  readonly subtitle: string;
  readonly buttons: ReadonlyArray<Button>;
}

const MintSongModal: FunctionComponent<MintSongModalProps> = ({
  onConfirm,
  onCancel,
  ...dialogProps
}) => {
  const theme = useTheme();

  const { values } = useFormikContext<FormikValues>();

  // const availableWallets: ReadonlyArray<any> = []; // for testing
  const availableWallets = supportedWallets.filter((walletName: string) => {
    return !!window.cardano && !!window.cardano[walletName];
  });

  /**
   * @returns content to display based on the
   * user's wallet and song minting status.
   */
  const getModalContent = useCallback((): DialogContent => {
    if (values.isMinting) {
      return {
        title: "Are you sure you don't want to mint your song?",
        subtitle:
          "Your song can still be uploaded, however an NFT will not be minted.",
        buttons: [
          {
            children: "Never mind",
            buttonType: "outlined",
            onClick: dialogProps.onClose,
          },
          {
            children: "Confirm",
            buttonType: "filled",
            onClick: onCancel,
          },
        ],
      };
    }

    if (availableWallets.length > 0) {
      return {
        title: "Select a connected wallet",
        subtitle: "Please select a connected to wallet to mint your song with.",
        buttons: [
          {
            children: "Cancel",
            buttonType: "outlined",
            onClick: dialogProps.onClose,
          },
        ],
      };
    }

    return {
      title: "Connect a Cardano wallet",
      subtitle:
        "Setup and or connect a Cardano wallet using one of the official " +
        "browser extensions below. After you've connected your wallet, " +
        "return to this screen to mint your song.",
      buttons: [
        {
          children: "Cancel",
          buttonType: "outlined",
          onClick: dialogProps.onClose,
        },
      ],
    };
  }, [onCancel, values.isMinting, availableWallets.length, dialogProps]);

  const [modalContent, setModalContent] = useState(getModalContent());

  /**
   * Set dialog content with a slight delay so that it does
   * not change during the dialog dismiss animation.
   */
  useEffect(() => {
    setTimeout(() => {
      setModalContent(getModalContent());
    }, 200);
  }, [dialogProps.open, getModalContent]);

  return (
    <Dialog { ...dialogProps }>
      <Stack spacing={ 2 } padding={ 3 } paddingBottom={ 2 }>
        <Stack spacing={ 0.5 }>
          <Typography variant="body2">{ modalContent.title }</Typography>
          <Typography variant="subtitle1">{ modalContent.subtitle }</Typography>
        </Stack>

        { !values.isMinting && (
          <Stack spacing={ 1 }>
            { availableWallets.length > 0
              ? availableWallets.map((id) => {
                  const info = walletInfo[id];

                  return (
                    <SelectWalletItem
                      key={ info.name }
                      name={ info.name }
                      logo={ info.logo }
                      onClick={ () => {
                        onConfirm(id);
                      } }
                    />
                  );
                })
              : supportedWallets.map((id) => {
                  const info = walletInfo[id];
                  const targetUrl =
                    browserName === "Chrome"
                      ? info.extensionUrl
                      : info.primaryUrl;

                  return (
                    <SelectWalletItem
                      key={ info.name }
                      name={ info.name }
                      logo={ info.logo }
                      onClick={ () => {
                        window.open(targetUrl, "_blank");
                      } }
                    />
                  );
                }) }
          </Stack>
        ) }
      </Stack>

      <Stack
        direction="row"
        py={ 1.5 }
        px={ 3 }
        spacing={ 2 }
        sx={ {
          justifyContent: "flex-end",
          backgroundColor: theme.colors.grey600,
        } }
      >
        { modalContent.buttons.map(({ buttonType, ...buttonProps }) => {
          return buttonType === "outlined" ? (
            <OutlinedButton
              backgroundColor={ theme.colors.grey600 }
              { ...buttonProps }
            />
          ) : (
            <FilledButton { ...buttonProps } />
          );
        }) }
      </Stack>
    </Dialog>
  );
};

export default MintSongModal;
