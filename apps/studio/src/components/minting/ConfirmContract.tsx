import { Box, Stack, Typography } from "@mui/material";
import { CheckboxField, HorizontalLine } from "@newm-web/elements";
import { Formik, FormikProps } from "formik";
import { FunctionComponent, useEffect } from "react";
import { artistAgreementPreview } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { selectSong } from "../../modules/song";
import { useAppSelector } from "../../common";
import ViewPDF from "../ViewPDF";

interface ConfirmContractProps {
  readonly onConfirm: (value: boolean) => void;
  readonly songTitle: string;
}

interface FormValues {
  readonly agreesToContract: boolean;
  readonly agreesToDistribution: boolean;
  readonly hasViewedAgreement: boolean;
  readonly isCreator: boolean;
}

type FormContentProps = FormikProps<FormValues> &
  Omit<ConfirmContractProps, "onConfirm">;

/**
 * Allows for viewing and accepting an artist agreement contract.
 */
const ConfirmContract: FunctionComponent<ConfirmContractProps> = ({
  songTitle,
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
      { (formikProps) => <FormContent songTitle={ songTitle } { ...formikProps } /> }
    </Formik>
  );
};

const FormContent: FunctionComponent<FormContentProps> = ({
  songTitle,
  values,
  setFieldValue,
  handleSubmit,
}) => {
  const { artistAgreement } = useAppSelector(selectSong);

  /**
   * Call onConfirm callback when form values change.
   */
  useEffect(() => {
    handleSubmit();
  }, [values, handleSubmit]);

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
        <CheckboxField
          disabled={ !values.hasViewedAgreement }
          label={
            <Typography
              color={ theme.colors.white }
              fontSize={ 12 }
              sx={ {
                opacity: values.hasViewedAgreement ? 1 : 0.5,
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

        <HorizontalLine style={ { marginTop: "24px" } } />
      </Stack>
    </Box>
  );
};

export default ConfirmContract;
