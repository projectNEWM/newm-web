import { FunctionComponent, useEffect, useState } from "react";
import {
  useIsSavedWalletAddressEnvMismatch,
  useIsWalletEnvMismatch,
} from "modules/session";
import WalletAddressEnvMismatchModal from "./WalletAddressEnvMismatchModal";
import WalletEnvMismatchModal from "./WalletEnvMismatchModal";

/**
 * Opens a modal that prompts the user to remedy a conflict between
 * their wallet and application environments.
 */
const EnvMismatchModal: FunctionComponent = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const isWalletEnvMismatch = useIsWalletEnvMismatch();
  const isAddressEnvMismatch = useIsSavedWalletAddressEnvMismatch();

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  /**
   * Open the appropriate modal if the wallet or address
   * environment doesn't match the application environment.
   */
  useEffect(() => {
    if (isWalletEnvMismatch) {
      setIsWalletModalOpen(true);
      return;
    }

    if (isAddressEnvMismatch) {
      setIsAddressModalOpen(true);
      return;
    }
  }, [isWalletEnvMismatch, isAddressEnvMismatch]);

  return (
    <>
      <WalletEnvMismatchModal
        isOpen={ isWalletModalOpen }
        onClose={ handleCloseWalletModal }
      />
      <WalletAddressEnvMismatchModal
        isOpen={ isAddressModalOpen }
        onClose={ handleCloseAddressModal }
      />
    </>
  );
};

export default EnvMismatchModal;
