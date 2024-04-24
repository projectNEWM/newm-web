import { Alert } from "@newm-web/components";
import { clearToastMessage, selectUi } from "../modules/ui";
import { useAppDispatch, useAppSelector } from "../common";

const Toast = () => {
  const dispatch = useAppDispatch();
  const {
    toast: { heading, message, severity },
  } = useAppSelector(selectUi);
  const handleClose = () => {
    dispatch(clearToastMessage());
  };

  return (
    <Alert
      heading={ heading }
      message={ message }
      severity={ severity }
      onClose={ handleClose }
    />
  );
};

export default Toast;
