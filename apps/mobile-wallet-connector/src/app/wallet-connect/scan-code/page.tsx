"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { Button, TextInput } from "@newm-web/elements";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "@newm-web/theme";
import { NEWMLogo } from "@newm-web/assets";
import { TimeRemaining, getTimeRemaining } from "@newm-web/utils";
import { useAppDispatch, useAppSelector } from "../../../common";
import { selectWallet, setConnectionData } from "../../../modules/wallet";

const Page: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useConnectWallet();
  const {
    connectionData: { connectionId, expiresAt },
  } = useAppSelector(selectWallet);
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
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
      router.replace("/wallet-connect");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (!connectionId) {
      router.replace("web-connected");
    }
  }, [connectionId, router]);

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
        Scan the QR Code with NEWM app
      </Typography>
      <Typography mt={ 0.5 } variant="subtitle1">
        or paste the code in the app
      </Typography>
      { connectionId ? (
        <Stack
          sx={ {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            mt: 5,
          } }
        >
          <Stack
            sx={ {
              alignItems: "center",
              gridArea: "1 / 1 / 2 / 2",
              justifyContent: "center",
              zIndex: "123",
            } }
          >
            <NEWMLogo height="80px" width="80px" />
          </Stack>

          <Stack sx={ { gridArea: "1 / 1 / 2 / 2" } }>
            <QRCode
              logoHeight={ 80 }
              logoPadding={ 90 }
              logoPaddingStyle="circle"
              logoWidth={ 80 }
              size={ 280 }
              value={ connectionId }
            />
          </Stack>
        </Stack>
      ) : (
        <Skeleton
          height={ 280 }
          sx={ { mt: 5 } }
          variant="rectangular"
          width={ 280 }
        />
      ) }
      <Stack mt={ 3 }>
        { timeLeft && timeLeft.total > 0 ? (
          <Typography>
            { `This code will expire in ${timeLeft.minutes || "00"} : ${
              timeLeft.seconds || "00"
            }` }
          </Typography>
        ) : (
          <Skeleton height={ 20 } variant="rectangular" width={ 205 } />
        ) }
      </Stack>
      <Stack
        flexDirection="row"
        gap={ 1 }
        justifyContent="center"
        maxWidth="528px"
        mt={ 3 }
        width="100%"
      >
        <TextInput
          isOptional={ false }
          label="QR Code"
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
