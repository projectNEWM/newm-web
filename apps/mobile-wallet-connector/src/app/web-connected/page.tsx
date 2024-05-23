"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Form, Formik, FormikValues } from "formik";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { Button, SwitchInputField } from "@newm-web/elements";
import { setToastMessage } from "../../modules/ui";
import { selectWallet, useConnectFromMobileThunk } from "../../modules/wallet";
import { useAppDispatch, useAppSelector } from "../../common";

const Page: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isConnected, wallet } = useConnectWallet();
  const { connectionData } = useAppSelector(selectWallet);

  const [connectFromMobile, { isLoading: isConnectFromMobileLoading }] =
    useConnectFromMobileThunk();

  const [isFormSubmitDisabled, setIsFormSubmitDisabled] = useState(true);

  const initialValues = {
    isHardwareWallet: false,
  };

  const handleWalletConnect = async ({ isHardwareWallet }: FormikValues) => {
    if (wallet) {
      await connectFromMobile({
        isHardwareWallet,
        wallet,
      });
    } else {
      dispatch(
        setToastMessage({
          message:
            "There is a problem with your wallet. Please try disconnecting and reconnecting it.",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsFormSubmitDisabled(false);
    } else {
      router.replace("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (connectionData.connectionId) {
      router.push("/scan-code");
    }
  }, [connectionData, router]);

  return (
    <>
      <Formik initialValues={ initialValues } onSubmit={ handleWalletConnect }>
        { ({ isSubmitting }) => (
          <Form>
            <Stack alignItems="center" px={ [2, 2, 0] } rowGap={ 3.5 }>
              <Button
                disabled={ isFormSubmitDisabled || isSubmitting }
                isLoading={ isConnectFromMobileLoading }
                type="submit"
                width="compact"
              >
                Connect from Mobile app
              </Button>
              <SwitchInputField
                description={
                  "If you are trying to connect a hardware wallet, please select this option."
                }
                disabled={ isSubmitting }
                name="isHardwareWallet"
                title="HARDWARE WALLET"
              />
            </Stack>
          </Form>
        ) }
      </Formik>
    </>
  );
};

export default Page;
