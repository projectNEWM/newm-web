"use client";
import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { Button } from "@newm-web/elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useAppDispatch } from "../../common";
import { setIsConnectWalletModalOpen } from "../../modules/ui";

const Page: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isConnected } = useConnectWallet();

  useEffect(() => {
    if (isConnected) {
      router.push("wallet-connect/web-connected");
    }
  }, [isConnected, router]);

  return (
    <>
      <Typography component="h1" fontWeight="700" mt={ 4 } variant="body2">
        Connect your wallet
      </Typography>
      <Typography mt={ 0.5 } variant="subtitle1">
        After connecting, you will be able to connect your wallet to the mobile
        app
      </Typography>
      <Button
        sx={ { mt: 3.5 } }
        width="compact"
        onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default Page;
