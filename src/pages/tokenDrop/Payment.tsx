import { Box, Stack, useTheme } from "@mui/material";
import {
  DisplayText,
  SectionHeading,
  TextInputField,
  TransactionPending,
} from "components";
import {
  AccentButton,
  FilledButton,
  HorizontalLine,
  Typography,
} from "elements";
import { FunctionComponent, useState } from "react";
import mursProfileImageSm from "assets/images/murs-profile@60px.png";
import { selectWallet } from "modules/wallet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import CopyIcon from "assets/images/CopyIcon";
import { useGetMursPrice } from "modules/sale";
import { setIsSelectWalletModalOpen } from "modules/ui";

interface InitialFormValues {
  readonly walletAddress: string;
}

const Payment: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // placeholder for Redux state after submitting transaction
  const [isTransactionSubmitted, setIsTransactionSubmitted] = useState(false);
  // placeholder for Redux state after submitting wallet address
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);

  const bundlePrice = useGetMursPrice();
  const { isConnected, isLoading } = useSelector(selectWallet);

  const initialFormValues: InitialFormValues = {
    walletAddress: "",
  };

  const handleViewAlbumArt = () => {
    navigate("");
  };

  const handleOpenModal = () => {
    dispatch(setIsSelectWalletModalOpen(true));
  };

  const handleWalletPurchase = () => {
    // TEMP: placeholder functionality for submitting transaction to API
    setIsTransactionSubmitted(true);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Payment address copied to clipboard");
  };

  const handleSubmitForm = (values: InitialFormValues) => {
    // TEMP: placeholder functionality for submitting address to API
    setIsAddressSubmitted(true);
  };

  return (
    <Box mt={ 3 } display="flex" flexDirection="column">
      <Stack spacing={ 2.5 } direction="column" maxWidth={ [9999, 9999, 450] }>
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
                src={ mursProfileImageSm }
                style={ { width: 60, height: 60, borderRadius: "50%" } }
                alt="murs profile"
              />

              <Box flexDirection="column">
                <Typography variant="h4" fontWeight={ 700 }>
                  Break up
                </Typography>
                <Typography variant="subtitle2">Murs</Typography>
              </Box>
            </Stack>

            <AccentButton onClick={ handleViewAlbumArt }>
              See album art
            </AccentButton>
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
            flex={ 1 }
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
                <DisplayText>0.008%</DisplayText> of
              </Typography>
            </Box>

            <Typography variant="subtitle1">
              future streaming royalties
            </Typography>
          </Box>

          <Box flexDirection="column" flex={ 1 }>
            <Box mb={ 1 }>
              <SectionHeading>WHAT YOU PAY</SectionHeading>
            </Box>

            { !!bundlePrice.ada && (
              <Box mb={ 0.25 }>
                <DisplayText>{ bundlePrice.ada } ADA</DisplayText>
              </Box>
            ) }

            { !!bundlePrice.usd && (
              <Typography variant="subtitle1">
                ~{ bundlePrice.usd } USD
              </Typography>
            ) }
          </Box>
        </Box>

        <HorizontalLine />

        <Stack direction="column" spacing={ 3 }>
          { !isAddressSubmitted && (
            <Box>
              <Box mb={ 1 }>
                <SectionHeading>PURCHASE WITH YOUR WALLET</SectionHeading>
              </Box>

              { !isConnected ? (
                <AccentButton
                  onClick={ handleOpenModal }
                  fullWidth={ true }
                  disabled={ isLoading }
                >
                  Connect wallet
                </AccentButton>
              ) : (
                <FilledButton
                  backgroundColor={ theme.colors.pink }
                  onClick={ handleWalletPurchase }
                  fullWidth={ true }
                  disabled={ !isConnected || isTransactionSubmitted }
                >
                  Purchase
                </FilledButton>
              ) }

              { isTransactionSubmitted && (
                <Box mt={ 3 }>
                  <TransactionPending
                    title="Transaction processing"
                    message={
                      "Your transaction is currently processing. This can " +
                      "take several minutes to complete."
                    }
                  />
                </Box>
              ) }
            </Box>
          ) }

          { !isTransactionSubmitted && (
            <Box>
              <Box mb={ 1 }>
                <SectionHeading>
                  { isAddressSubmitted ? "" : "OR " }PURCHASE MANUALLY
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
                        disabled={ isAddressSubmitted }
                        value={
                          isAddressSubmitted ? "EXAMPLE_ADDRESS" : undefined
                        }
                      />

                      { isAddressSubmitted ? (
                        <AccentButton
                          onClick={ () =>
                            handleCopyToClipboard("EXAMPLE_ADDRESS")
                          }
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
                        { isAddressSubmitted
                          ? "Send 42 ADA to the payment address above."
                          : "Submit a wallet address to generate a payment address." }
                      </Typography>
                    </Box>
                  </Form>
                ) }
              </Formik>

              { isAddressSubmitted && (
                <Box mt={ 3 }>
                  <TransactionPending
                    title="Waiting to receive payment..."
                    message={
                      "You have {TIME_REMAINING} to complete your purchase, " +
                      "using the payment address above. Processing may take " +
                      "several minutes once purchase is complete."
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
