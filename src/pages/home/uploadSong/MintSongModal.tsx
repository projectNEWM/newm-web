import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { supportedWallets, walletInfo } from "modules/wallet";
import { ButtonProps, DialogProps, Stack, useTheme } from "@mui/material";
import { SelectWalletItem } from "components";
import { browserName } from "react-device-detect";
import { Dialog, FilledButton, OutlinedButton, Typography } from "elements";
import { FormikValues, useFormikContext } from "formik";

interface MintSongModalProps extends Omit<DialogProps, "onClose"> {
  /** Called when the modal is closed */
  readonly onClose: VoidFunction;
  /** Called when declining to mint an NFT */
  readonly onCancel: VoidFunction;
  /** Called when selecting a wallet to mint the NFT */
  readonly onConfirm: (walletName: string) => void;
}

export interface Button extends ButtonProps {
  readonly buttonType: "outlined" | "filled";
}

interface DialogContent {
  readonly title: string;
  readonly subtitle: string;
  readonly wallets: ReadonlyArray<string>;
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
        wallets: [],
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
        title: "Select an installed wallet",
        subtitle: "Please select an installed wallet to mint your song with.",
        wallets: availableWallets,
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
      title: "Install a Cardano wallet",
      subtitle:
        "Setup and or connect a Cardano wallet using one of the official " +
        "browser extensions below. After you've connected your wallet, return " +
        "to this screen, refresh the page, and select your installed wallet.",
      wallets: supportedWallets,
      buttons: [
        {
          children: "Cancel",
          buttonType: "outlined",
          onClick: dialogProps.onClose,
        },
      ],
    };
  }, [onCancel, values.isMinting, availableWallets, dialogProps]);

  const [modalContent, setModalContent] = useState(getModalContent());

  /**
   * Set dialog content with a slight delay so that it does
   * not change during the dialog dismiss animation.
   */
  useEffect(() => {
    setTimeout(() => {
      setModalContent(getModalContent());
    }, 500);
  }, [getModalContent]);

  return (
    <Dialog { ...dialogProps }>
      <Stack spacing={ 2 } padding={ 3 } paddingBottom={ 2 }>
        <Stack spacing={ 0.5 }>
          <Typography variant="body2">{ modalContent.title }</Typography>
          <Typography variant="subtitle1">{ modalContent.subtitle }</Typography>
        </Stack>

        { modalContent.wallets.length > 0 && (
          <Stack spacing={ 1 }>
            { modalContent.wallets.map((id) => {
              const info = walletInfo[id];
              const targetUrl =
                browserName === "Chrome" ? info.extensionUrl : info.primaryUrl;

              return (
                <SelectWalletItem
                  key={ id }
                  name={ info.displayName }
                  logo={ info.logo }
                  onClick={ () => {
                    availableWallets.length > 0
                      ? onConfirm(id)
                      : window.open(targetUrl, "_blank");
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
        { modalContent.buttons.map(({ buttonType, ...buttonProps }, idx) => {
          return buttonType === "outlined" ? (
            <OutlinedButton
              key={ `modal-button-${idx}` }
              backgroundColor={ theme.colors.grey600 }
              { ...buttonProps }
            />
          ) : (
            <FilledButton key={ `modal-button-${idx}` } { ...buttonProps } />
          );
        }) }
      </Stack>
    </Dialog>
  );
};

export default MintSongModal;
