import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import {
  DisplayText,
  Modal,
  SectionHeading,
  TextInputField,
  TransactionStatus,
} from "components";
import {
  AccentButton,
  FilledButton,
  HorizontalLine,
  Typography,
} from "elements";
import { FunctionComponent, useEffect, useState } from "react";
import { selectWallet } from "modules/wallet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import CopyIcon from "assets/images/CopyIcon";
import {
  PaymentType,
  PurchaseStatus,
  clearPurchase,
  createPurchase,
  parseBundleAmounts,
  extendedApi as saleApi,
  selectSale,
  selectSalesFor,
} from "modules/sale";
import artistAssets from "assets/artist";
import { setIsSelectWalletModalOpen, setToastMessage } from "modules/ui";
import { displayCountdown } from "common";
import { browserName } from "react-device-detect";
import { displayUsd } from "common/stringUtils";
import { projectDetails } from "buildParams";

interface InitialFormValues {
  readonly walletAddress: string;
}

const { projectId } = projectDetails;

const Payment: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isConnected,
    adaUsdRate,
    isLoading: isWalletLoading,
    walletName,
  } = useSelector(selectWallet);
  const {
    purchaseOrder,
    paymentType,
    purchaseStatus,
    isTransactionCreated,
    isLoading: isSaleLoading,
  } = useSelector(selectSale);
  const sales = useSelector(selectSalesFor(projectDetails.projectId));

  const [isAlbumArtModalOpen, setIsAlbumArtModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("--:--");

  const bundleAmounts = parseBundleAmounts(sales[0], adaUsdRate);
  const isLoading = isWalletLoading || isSaleLoading;
  const paymentAddress = purchaseOrder?.paymentAddress;
  const isPending = purchaseStatus === PurchaseStatus.Pending;
  const isProcessing = purchaseStatus === PurchaseStatus.Processing;
  const activePurchase = isPending || isProcessing;
  const isWalletExtensionAvailable = ["Chrome", "Brave"].includes(browserName);

  const initialFormValues: InitialFormValues = {
    walletAddress: "",
  };

  const handleOpenWalletModal = () => {
    dispatch(setIsSelectWalletModalOpen(true));
  };

  const handleWalletPurchase = async () => {
    if (!window.Wallets[walletName] || !sales[0]) {
      dispatch(
        setToastMessage({
          message: "Error creating purchase order",
          severity: "error",
        })
      );
      return;
    }

    dispatch(
      createPurchase({
        projectId,
        bundleId: sales[0].id,
        paymentType: PaymentType.Wallet,
      })
    );
  };

  const handleCopyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Payment address copied to clipboard");
  };

  const handleSubmitForm = (values: InitialFormValues) => {
    dispatch(
      saleApi.endpoints.createPurchaseOrder.initiate({
        projectId,
        bundleId: sales[0].id,
        receiveAddress: values.walletAddress,
        paymentType: PaymentType.Manual,
      })
    );
  };

  /**
   * Update purchase time remaining every second if there
   * is an incomplete order present.
   */
  useEffect(() => {
    if (!purchaseOrder?.timeout) {
      return;
    }

    const handleSetTimeRemaining = () => {
      const currentDate = new Date();
      const endDate = new Date(purchaseOrder.timeout);
      setTimeRemaining(displayCountdown(endDate, currentDate));
    };

    handleSetTimeRemaining();
    const intervalId = setInterval(() => {
      handleSetTimeRemaining();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [purchaseOrder]);

  /**
   * Ping service to get purchase status every 30 seconds.
   */
  useEffect(() => {
    if (!purchaseOrder) {
      return;
    }

    const checkPurchaseStatus = (purchaseId: number) => {
      dispatch(saleApi.endpoints.getPurchaseStatus.initiate(purchaseId));
    };

    checkPurchaseStatus(purchaseOrder.purchaseId);
    const intervalId = setInterval(
      checkPurchaseStatus,
      30000,
      purchaseOrder.purchaseId
    );

    return () => clearInterval(intervalId);
  }, [purchaseOrder, dispatch]);

  /**
   * When order is complete, navigate to congratulations
   * page and clear purchase data.
   */
  useEffect(() => {
    if (purchaseStatus === PurchaseStatus.Completed) {
      navigate("../congratulations");
      dispatch(clearPurchase());
    }

    if (purchaseStatus === PurchaseStatus.Timeout) {
      dispatch(clearPurchase());
    }
  }, [purchaseStatus, navigate, dispatch]);

  return (
    <Box mt={ 3 } display="flex" flexDirection="column">
      <Modal
        open={ isAlbumArtModalOpen }
        handleClose={ () => setIsAlbumArtModalOpen(false) }
        variant="full"
      >
        <img
          src={ artistAssets.albumArt }
          alt="album art"
          style={ {
            padding: "1rem 0 1rem 0",
            maxWidth: "100vw",
            maxHeight: "88vh",
          } }
        />
      </Modal>

      <Stack spacing={ 2.5 } direction="column" maxWidth={ [9999, 9999, 478] }>
        <Box flexDirection="column">
          <Box mb={ 1 }>
            <SectionHeading>SONG</SectionHeading>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={ {
              backgroundColor: theme.colors.grey600,
              borderRadius: "6px",
              padding: 1.5,
            } }
          >
            <Stack spacing={ 2 } direction="row" alignItems="center">
              <img
                src={ artistAssets.albumArtXs }
                style={ { width: 60, height: 60, borderRadius: "50%" } }
                alt="profile"
              />

              <Box flexDirection="column">
                <Typography variant="h4" fontWeight={ 700 }>
                  { projectDetails.songName }
                </Typography>
                <Typography variant="subtitle2">
                  { projectDetails.artistName }
                </Typography>
              </Box>
            </Stack>

            { !isSmallScreen && (
              <AccentButton onClick={ () => setIsAlbumArtModalOpen(true) }>
                See album art
              </AccentButton>
            ) }
          </Box>
        </Box>

        <HorizontalLine />

        <Box
          display="flex"
          flexGrow={ 1 }
          flexDirection={ ["column", "column", "row"] }
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            mb={ [4, 4, 0] }
          >
            <Box mb={ 1 }>
              <SectionHeading>WHAT YOU GET</SectionHeading>
            </Box>

            <Box mb={ 0.25 }>
              <Typography variant="subtitle1">
                <DisplayText>
                  { bundleAmounts.size.toLocaleString() } stream tokens
                </DisplayText>
              </Typography>
            </Box>

            <Typography variant="subtitle1">of the song NFT</Typography>
          </Box>

          <Box flexDirection="column">
            <Box mb={ 1 }>
              <SectionHeading>WHAT YOU PAY</SectionHeading>
            </Box>

            <Box mb={ 0.25 }>
              <DisplayText>{ bundleAmounts.adaPrice } ADA</DisplayText>
            </Box>

            { !!bundleAmounts.usdPrice && (
              <Typography variant="subtitle1">
                ~{ displayUsd(bundleAmounts.usdPrice) } USD
              </Typography>
            ) }
          </Box>
        </Box>

        <HorizontalLine />

        <Stack direction="column" spacing={ 3 }>
          { isWalletExtensionAvailable && paymentType !== PaymentType.Manual && (
            <Box>
              <Box mb={ 1 }>
                <SectionHeading>PURCHASE WITH YOUR WALLET</SectionHeading>
              </Box>

              { !isConnected ? (
                <AccentButton
                  onClick={ handleOpenWalletModal }
                  fullWidth={ true }
                  disabled={ isLoading }
                >
                  Connect wallet
                </AccentButton>
              ) : (
                <FilledButton
                  onClick={ handleWalletPurchase }
                  fullWidth={ true }
                  disabled={ isLoading || isTransactionCreated }
                >
                  Complete purchase
                </FilledButton>
              ) }

              { activePurchase && (
                <Box mt={ 3 }>
                  <TransactionStatus
                    title={
                      isTransactionCreated
                        ? "Transaction processing"
                        : "Waiting to receive payment..."
                    }
                    message={
                      isWalletLoading
                        ? "Your transaction is being generated. Please input " +
                          "your spending password when prompted."
                        : isTransactionCreated
                        ? "Your transaction is currently processing. This " +
                          "can take several minutes to complete."
                        : `You have ${timeRemaining} to complete your ` +
                          "purchase. Processing may take several minutes " +
                          "once purchase is complete."
                    }
                  />
                </Box>
              ) }
            </Box>
          ) }

          { paymentType !== PaymentType.Wallet && (
            <Box>
              <Box mb={ 1 }>
                <SectionHeading>
                  { !isWalletExtensionAvailable
                    ? "PURCHASE"
                    : paymentAddress
                    ? "PURCHASE MANUALLY"
                    : "OR PURCHASE MANUALLY" }
                </SectionHeading>
              </Box>

              <Formik
                initialValues={ initialFormValues }
                onSubmit={ handleSubmitForm }
              >
                { ({ values }: FormikProps<FormikValues>) => (
                  <Form>
                    <Stack direction="row" spacing={ 1.5 }>
                      <TextInputField
                        name="walletAddress"
                        autoComplete="off"
                        widthType="full"
                        placeholder="Enter your wallet address"
                        disabled={ activePurchase }
                        value={ paymentAddress }
                      />

                      { paymentAddress ? (
                        <AccentButton
                          onClick={ () => handleCopyToClipboard(paymentAddress) }
                        >
                          <CopyIcon />
                        </AccentButton>
                      ) : (
                        <AccentButton
                          disabled={ !values.walletAddress }
                          type="submit"
                        >
                          Submit
                        </AccentButton>
                      ) }
                    </Stack>

                    <Box mt={ 1 }>
                      <Typography variant="subtitle1">
                        { paymentAddress
                          ? `Send ${bundleAmounts.adaPrice} ADA to the ` +
                            "payment address above."
                          : "Submit a wallet address to generate a payment address." }
                      </Typography>
                    </Box>
                  </Form>
                ) }
              </Formik>

              { activePurchase && (
                <Box mt={ 3 }>
                  <TransactionStatus
                    title={
                      purchaseStatus === PurchaseStatus.Pending
                        ? "Waiting to receive payment..."
                        : "Transaction processing"
                    }
                    message={
                      purchaseStatus === PurchaseStatus.Pending
                        ? `You have ${timeRemaining} to complete your ` +
                          "purchase, using the payment address above. " +
                          "Processing may take several minutes once " +
                          "purchase is complete."
                        : "Your transaction is currently processing. This " +
                          "can take several minutes to complete."
                    }
                  />
                </Box>
              ) }
            </Box>
          ) }
        </Stack>
      </Stack>
    </Box>
  );
};

export default Payment;
