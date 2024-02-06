import { FunctionComponent, useEffect } from "react";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { WalletEnvMismatchModal as WalletEnvMismatchModalComponent } from "@newm-web/components";
import { getIsWalletEnvMismatch } from "@newm-web/utils";
import { useAppDispatch, useAppSelector } from "../common";
import { selectUi, setIsWalletEnvMismatchModalOpen } from "../modules/ui";

/**
 * Prompts a user to select the correct wallet environment to
 * match the application environment and then refresh the page.
 */
const WalletEnvMismatchModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const { isWalletEnvMismatchModalOpen } = useAppSelector(selectUi);

  const handleClose = () => {
    dispatch(setIsWalletEnvMismatchModalOpen(false));
  };

  useEffect(() => {
    const handleOpen = async () => {
      if (!wallet) return;

      const isEnvMismatch = await getIsWalletEnvMismatch(wallet);

      if (isEnvMismatch) {
        dispatch(setIsWalletEnvMismatchModalOpen(true));
      }
    };

    handleOpen();
  }, [dispatch, wallet]);

  return (
    <WalletEnvMismatchModalComponent
      isOpen={ isWalletEnvMismatchModalOpen }
      onClose={ handleClose }
    />
  );
};

export default WalletEnvMismatchModal;
