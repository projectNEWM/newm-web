import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "modules/session";
import { Modal } from "components";

interface IdenfyModalProps {
  readonly isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClose: (event: React.SyntheticEvent<any> | Event) => void;
}

const IdenfyModal: FunctionComponent<IdenfyModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const {
    idenfy: { authToken },
  } = useSelector(selectSession);

  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <iframe
        allow="camera"
        allowFullScreen={ true }
        style={ {
          width: "100%",
          height: "100%",
        } }
        src={ `https://ui.idenfy.com/?authToken=${authToken}` }
        title="iDenfy verification session"
      ></iframe>
    </Modal>
  );
};

export default IdenfyModal;
