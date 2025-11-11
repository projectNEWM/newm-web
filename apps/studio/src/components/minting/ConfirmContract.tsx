import { Box, Stack, Typography } from "@mui/material";
import { CheckboxField, HorizontalLine } from "@newm-web/elements";
import { Formik, FormikProps } from "formik";
import { FunctionComponent, useEffect } from "react";
import { artistAgreementPreview } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { useFlags } from "launchdarkly-react-client-sdk";
import { selectSong } from "../../modules/song";
import { useAppSelector } from "../../common";
import ViewPDF from "../ViewPDF";

interface ConfirmContractProps {
  readonly isCoCreator?: boolean;
  readonly onConfirm: (value: boolean) => void;
  readonly songTitle: string;
}

interface FormValues {
  readonly agreesToContract: boolean;
  readonly agreesToDistribution: boolean;
  readonly hasViewedAgreement: boolean;
  readonly isCreator: boolean;
}

interface CheckboxesProps {
  readonly hasViewedAgreement: boolean;
  readonly isCoCreator?: boolean;
  readonly songTitle: string;
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
}) => {
  const initialValues: FormValues = {
    agreesToContract: false,
    agreesToDistribution: false,
    hasViewedAgreement: false,
    isCreator: false,
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
          isCoCreator={ isCoCreator }
          songTitle={ songTitle }
          { ...formikProps }
        />
      ) }
    </Formik>
  );
};

const ReleaseCheckboxes: FunctionComponent<CheckboxesProps> = ({
  songTitle,
  hasViewedAgreement,
}) => {
  return (
    <>
      <CheckboxField
        disabled={ !hasViewedAgreement }
        label={
          <Typography
            sx={ {
              color: theme.colors.white,
              fontSize: 12,
              opacity: hasViewedAgreement ? 1 : 0.5,
            } }
            variant="subtitle1"
          >
            I have read the contract and agree to its Terms and Conditions.
          </Typography>
        }
        name="agreesToContract"
      />

      <CheckboxField
        label={
          <Typography
            color={ theme.colors.white }
            fontSize={ 12 }
            variant="subtitle1"
          >
            I possess all necessary rights, permissions, and licenses from any
            third-party holding rights to{ " " }
            <strong>
              <em>{ songTitle }</em>
            </strong>
            .
          </Typography>
        }
        name="isCreator"
      />

      <CheckboxField
        label={
          <Typography
            color={ theme.colors.white }
            fontSize={ 12 }
            variant="subtitle1"
          >
            I agree to distribute this release to all current and future
            available stores, including digital downloads.
          </Typography>
        }
        name="agreesToDistribution"
      />
    </>
  );
};

const LegacyCheckboxes: FunctionComponent<CheckboxesProps> = ({
  songTitle,
  isCoCreator,
  hasViewedAgreement,
}) => {
  return (
    <>
      <CheckboxField
        label={
          isCoCreator ? (
            <Typography
              color={ theme.colors.white }
              fontSize={ 12 }
              variant="subtitle1"
            >
              I possess all necessary rights, permissions, and licenses from any
              third-party holding rights to <strong>{ songTitle }</strong> and
              confirm the accuracy of all mentioned collaborators.
            </Typography>
          ) : (
            <Typography
              color={ theme.colors.white }
              fontSize={ 12 }
              variant="subtitle1"
            >
              I possess all necessary rights, permissions, and licenses from any
              third-party holding rights to <strong>{ songTitle }.</strong>
            </Typography>
          )
        }
        name="isCreator"
      />

      <CheckboxField
        disabled={ !hasViewedAgreement }
        label={
          <Typography
            sx={ {
              color: "white",
              fontSize: 12,
              opacity: hasViewedAgreement ? 1 : 0.5,
            } }
            variant="subtitle1"
          >
            I have read the contract and agree to its Terms and Conditions.
          </Typography>
        }
        name="agreesToContract"
      />

      <Typography color={ theme.colors.white } fontSize={ 12 } variant="subtitle1">
        <CheckboxField
          label={
            <Typography
              color={ theme.colors.white }
              fontSize={ 12 }
              variant="subtitle1"
            >
              By selecting &lsquo;Distribute & Mint&rsquo; you agree to
              distribute this song to all current and future available stores
              including digital downloads.
            </Typography>
          }
          name="agreesToDistribution"
        />
      </Typography>
    </>
  );
};

const FormContent: FunctionComponent<FormContentProps> = ({
  songTitle,
  isCoCreator,
  values,
  setFieldValue,
  handleSubmit,
}) => {
  const { artistAgreement } = useAppSelector(selectSong);

  const { webStudioReleaseDistributionPaymentEnhancements } = useFlags();
  /**
   * Call onConfirm callback when form values change.
   */
  useEffect(() => {
    handleSubmit();
  }, [values, handleSubmit]);

  if (webStudioReleaseDistributionPaymentEnhancements) {
    return (
      <Box>
        <Stack direction="column" mt={ 3 } spacing={ 1 }>
          <ViewPDF
            data={ artistAgreement }
            isViewed={ values.hasViewedAgreement }
            preview={ artistAgreementPreview }
            onViewPDF={ () => setFieldValue("hasViewedAgreement", true) }
          />
        </Stack>

        <Stack direction="column" mt={ 3 } spacing={ 2 } textAlign="left">
          <ReleaseCheckboxes
            hasViewedAgreement={ values.hasViewedAgreement }
            isCoCreator={ isCoCreator }
            songTitle={ songTitle }
          />

          <HorizontalLine style={ { marginTop: "24px" } } />
        </Stack>
      </Box>
    );
  }

  // Legacy Contract format and checkboxes, remove when webStudioReleaseDistributionPaymentEnhancements flag is removed

  return (
    <Box>
      <Stack direction="column" spacing={ 1 }>
        <Typography color={ theme.colors.grey100 } fontWeight={ 500 }>
          View your contract here
        </Typography>

        <ViewPDF
          data={ artistAgreement }
          isViewed={ values.hasViewedAgreement }
          preview={ artistAgreementPreview }
          onViewPDF={ () => setFieldValue("hasViewedAgreement", true) }
        />
      </Stack>

      <Stack direction="column" mt={ 3 } spacing={ 2 } textAlign="left">
        <LegacyCheckboxes
          hasViewedAgreement={ values.hasViewedAgreement }
          isCoCreator={ isCoCreator }
          songTitle={ songTitle }
        />

        <HorizontalLine style={ { marginTop: "24px" } } />

        <Typography
          color={ theme.colors.white }
          fontSize={ 12 }
          variant="subtitle1"
        >
          The distribution and minting process may take 3-15 days to complete.
        </Typography>
      </Stack>
    </Box>
  );
};

export default ConfirmContract;
