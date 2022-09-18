import { FunctionComponent, useCallback, useEffect, useState } from "react";
import {
  enableWallet,
  setWalletName,
  supportedWallets,
  walletInfo,
} from "modules/wallet";
import { ButtonProps, Stack, useTheme } from "@mui/material";
import { SelectWalletItem } from "components";
import { browserName } from "react-device-detect";
import { Dialog, FilledButton, OutlinedButton, Typography } from "elements";
import { useDispatch, useSelector } from "react-redux";
import { selectUi, setIsSelectWalletModalOpen } from "modules/ui";

export interface Button extends ButtonProps {
  readonly buttonType: "outlined" | "filled";
}

interface DialogContent {
  readonly title: string;
  readonly subtitle: string;
  readonly wallets: ReadonlyArray<string>;
  readonly buttons: ReadonlyArray<Button>;
}

const SelectWalletModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isSelectWalletModalOpen } = useSelector(selectUi);

  const availableWallets = supportedWallets.filter((walletName: string) => {
    return !!window.cardano && !!window.cardano[walletName];
  });

  const handleClose = useCallback(() => {
    dispatch(setIsSelectWalletModalOpen(false));
  }, [dispatch]);

  /**
   * Select a wallet and enable it.
   */
  const handleSelectWallet = (walletName: string) => {
    dispatch(setWalletName(walletName));
    dispatch(enableWallet());
  };

  /**
   * @returns content to display based on the
   * user's wallet and song minting status.
   */
  const getModalContent = useCallback((): DialogContent => {
    if (availableWallets.length > 0) {
      return {
        title: "Select an installed wallet",
        subtitle: "Please select an installed wallet to mint your song with.",
        wallets: availableWallets,
        buttons: [
          {
            children: "Cancel",
            buttonType: "outlined",
            onClick: handleClose,
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
          onClick: handleClose,
        },
      ],
    };
  }, [availableWallets, handleClose]);

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
    <Dialog open={ isSelectWalletModalOpen }>
      <Stack spacing={ 2 } padding={ 3 } paddingBottom={ 2 }>
        <Stack spacing={ 1 }>
          <Typography variant="body2">{ modalContent.title }</Typography>
          <Typography variant="subtitle1">{ modalContent.subtitle }</Typography>
        </Stack>

        { modalContent.wallets.length > 0 && (
          <Stack spacing={ 1 }>
            { modalContent.wallets.map((id) => {
              const info = walletInfo[id];

              return (
                <SelectWalletItem
                  key={ id }
                  name={ info.displayName }
                  logo={ info.logo }
                  onClick={ () => {
                    availableWallets.length > 0
                      ? handleSelectWallet(id)
                      : window.open(info.extensionUrl, "_blank");
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

export default SelectWalletModal;
