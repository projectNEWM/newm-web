"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Stack, Typography } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { Button, TextInput } from "@newm-web/elements";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "@newm-web/theme";
import Image from "next/image";
import { TimeRemaining, getTimeRemaining } from "@newm-web/utils";
import { useAppDispatch, useAppSelector } from "../../../common";
import { selectWallet, setConnectionData } from "../../../modules/wallet";

const Page: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useConnectWallet();
  const {
    connectionData: { connectionId, expiresAt, qrCodeBlob },
  } = useAppSelector(selectWallet);
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [qrCodeSourceUrl, setQrCodeSourceUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>();

  /**
   * Copies the saved wallet address to the clipboard.
   */
  const handleClickCopyIcon = () => {
    if (!connectionId) return;

    navigator.clipboard.writeText(connectionId);
    setIsCopied(true);
  };

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (!connectionId) {
      router.replace("/connect-wallet");
    }
  }, [connectionId, router]);

  useEffect(() => {
    if (qrCodeBlob) {
      // setQrCodeSourceUrl(URL.createObjectURL(qrCodeBlob));
      // setQrCodeSourceUrl(qrCodeBlob);
      console.log(qrCodeBlob);
    }
  }, [qrCodeBlob]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDateUTC = moment().utc().toDate();
      const expiresAtUTC = moment(`${expiresAt}Z`).toDate();

      const newTimeLeft = getTimeRemaining(expiresAtUTC, currentDateUTC);

      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        dispatch(
          setConnectionData({
            connectionId: "",
            expiresAt: "",
            qrCodeBlob: undefined,
          })
        );
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, dispatch]);

  /**
   * Resets the successfully copied icon after it appears.
   */
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <>
      <Typography component="h1" fontWeight="700" mt={ 4 } variant="body2">
        Scan the QR Code with Newm app
      </Typography>
      <Typography mb={ 5 } mt={ 0.5 } variant="subtitle1">
        or paste the code in the app
      </Typography>
      <Image
        alt="QR code"
        height={ 280 }
        sizes="100vw"
        src={ qrCodeSourceUrl }
        unoptimized={ true }
        width={ 280 }
      />
      { timeLeft && (
        <Typography>
          { timeLeft.total <= 0 || isNaN(timeLeft.total)
            ? "The code has expired. Please refresh the page to generate a new code."
            : `This code will expire in ${timeLeft.minutes || "00"} : ${
                timeLeft.seconds || "00"
              }` }
        </Typography>
      ) }
      <Stack
        flexDirection="row"
        gap={ 1 }
        justifyContent="center"
        maxWidth="480px"
        mt={ 3 }
        width="100%"
      >
        <TextInput
          isOptional={ false }
          label="or use this code"
          name="code"
          readOnly={ true }
          title={ connectionId }
          value={ connectionId }
          widthType="full"
        />
        <Button
          color="music"
          sx={ {
            alignSelf: "flex-end",
            gap: 1,
            minHeight: "46px",
          } }
          variant="secondary"
          width="compact"
          onClick={ handleClickCopyIcon }
        >
          Copy
          { isCopied ? (
            <DoneIcon fontSize="small" sx={ { color: theme.colors.green } } />
          ) : (
            <ContentCopyIcon
              fontSize="small"
              sx={ { color: theme.colors.grey200 } }
            />
          ) }
        </Button>
      </Stack>
    </>
  );
};

export default Page;
