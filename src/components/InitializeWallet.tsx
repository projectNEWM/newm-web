import { enableConnectedWallet } from "modules/wallet";
import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Checks to see if a wallet has been connected
 * and still has connection permissions and updates
 * the Redux state.
 */
const InitializeWallet: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableConnectedWallet());
  }, [dispatch]);

  return null;
};

export default InitializeWallet;
