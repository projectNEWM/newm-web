import { Box, IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { HorizontalLine, Tooltip, Typography } from "elements";
import { Formik, FormikProps } from "formik";
import { selectSong } from "modules/song";
import { FunctionComponent, useEffect } from "react";
import agreementPreview from "assets/images/artist-agreement-preview.jpg";
import {
  COLLABORATOR_FEE_IN_ADA,
  MINTING_FEE_IN_ADA,
  useAppSelector,
} from "common";
import theme from "theme";
import ViewPDF from "../ViewPDF";
import CheckboxField from "../form/CheckboxField";

interface ConfirmContractProps {
  readonly songTitle: string;
  readonly isCoCreator?: boolean;
  readonly onConfirm: (value: boolean) => void;
  readonly totalOwners: number;
}

interface FormValues {
  readonly hasViewedAgreement: boolean;
  readonly isCreator: boolean;
  readonly agreesToContract: boolean;
  readonly agreesToDistribution: boolean;
}

type FormContentProps = FormikProps<FormValues> &
  Omit<ConfirmContractProps, "onConfirm">;

/**
 * Allows for viewing and accepting an artist agreement contract.
 */
const ConfirmContract: FunctionComponent<ConfirmContractProps> = ({
  songTitle,
  isCoCreator = false,
  onConfirm,
  totalOwners,
}) => {
  const initialValues: FormValues = {
    hasViewedAgreement: false,
    isCreator: false,
    agreesToContract: false,
    agreesToDistribution: false,
  };

  const handleChange = (values: FormValues) => {
    if (
      values.isCreator &&
      values.agreesToContract &&
      values.agreesToDistribution
    ) {
      onConfirm(true);
    } else {
      onConfirm(false);
    }
  };

  return (
    <Formik initialValues={ initialValues } onSubmit={ handleChange }>
      { (formikProps) => (
        <FormContent
          songTitle={ songTitle }
          isCoCreator={ isCoCreator }
          totalOwners={ totalOwners }
          { ...formikProps }
        />
      ) }
    </Formik>
  );
};

const FormContent: FunctionComponent<FormContentProps> = ({
  songTitle,
  isCoCreator,
  values,
  setFieldValue,
  handleSubmit,
  totalOwners,
}) => {
  const { artistAgreement } = useAppSelector(selectSong);
  const TotalFeeToMint = parseFloat(
    (MINTING_FEE_IN_ADA + totalOwners * COLLABORATOR_FEE_IN_ADA).toFixed(2)
  );

  /**
   * Call onConfirm callback when form values change.
   */
  useEffect(() => {
    handleSubmit();
  }, [values, handleSubmit]);

  return (
    <Box>
      <Stack direction="column" spacing={ 1 }>
        <Typography fontWeight={ 500 } color="grey100">
          View your contract here
        </Typography>

        <ViewPDF
          isViewed={ values.hasViewedAgreement }
          onViewPDF={ () => setFieldValue("hasViewedAgreement", true) }
          data={ artistAgreement }
          preview={ agreementPreview }
        />
      </Stack>

      <Stack direction="column" mt={ 3 } spacing={ 2 } textAlign="left">
        <CheckboxField
          name="isCreator"
          label={
            isCoCreator ? (
              <Typography variant="subtitle1" color="white" fontSize={ 12 }>
                I confirm that I am the primary creator of{ " " }
                <strong>{ songTitle }</strong> and all mentioned collaborators are
                accurate.
              </Typography>
            ) : (
              <Typography variant="subtitle1" color="white" fontSize={ 12 }>
                I confirm that I am the exclusive creator of{ " " }
                <strong>{ songTitle }.</strong>
              </Typography>
            )
          }
        />

        <CheckboxField
          name="agreesToContract"
          disabled={ !values.hasViewedAgreement }
          label={
            <Typography
              variant="subtitle1"
              sx={ {
                color: "white",
                fontSize: 12,
                opacity: values.hasViewedAgreement ? 1 : 0.5,
              } }
            >
              I have read the contract and agree to its Terms and Conditions.
            </Typography>
          }
        />

        <Typography variant="subtitle1" color="white" fontSize={ 12 }>
          <CheckboxField
            name="agreesToDistribution"
            label={
              <Typography variant="subtitle1" color="white" fontSize={ 12 }>
                By selecting &lsquo;Distribute & Mint&rsquo; you agree to
                distribute this song to all current and future available stores
                including digital downloads.
              </Typography>
            }
          />
        </Typography>

        <HorizontalLine style={ { marginTop: "24px" } } />

        <Stack direction="row" columnGap={ 0.5 }>
          <Typography variant="subtitle1" color="white" fontSize={ 12 }>
            The minting process has a fee of{ " " }
            <strong>{ `~₳${TotalFeeToMint}` }</strong> and may take 3-15 days to
            complete.
          </Typography>

          <Tooltip title={ " " }>
            <IconButton sx={ { padding: 0 } }>
              <HelpIcon
                sx={ {
                  color: theme.colors.grey100,
                  height: "18px",
                  width: "18px",
                } }
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ConfirmContract;
