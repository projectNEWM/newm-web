import { FunctionComponent } from "react";
import { DialogProps, Typography } from "@mui/material";
import { ProfileModal, SocialsProps } from "@newm-web/components";
import theme from "@newm-web/theme";

interface OwnerModalProps extends Omit<DialogProps, "onClose"> {
  readonly biography?: string;
  readonly nickname?: string;
  readonly onClose: VoidFunction;
  readonly role?: string;
  readonly socials?: SocialsProps;
}

const OwnerModal: FunctionComponent<OwnerModalProps> = ({
  biography,
  nickname = "",
  onClose,
  open,
  role,
  socials = {},
}) => {
  return (
    <ProfileModal
      isOpen={ open }
      name={ nickname }
      socials={ socials }
      onClose={ onClose }
    >
      { role ? (
        <>
          <Typography variant="body1">MAIN ROLES</Typography>
          <Typography color={ theme.colors.white } mt={ 0.5 } variant="subtitle1">
            { role }
          </Typography>
        </>
      ) : null }

      { biography ? (
        <>
          <Typography mt={ 2.5 } variant="body1">
            DESCRIPTION
          </Typography>
          <Typography color={ theme.colors.white } mt={ 0.5 } variant="subtitle1">
            { biography }
          </Typography>
        </>
      ) : null }
    </ProfileModal>
  );
};

export default OwnerModal;
