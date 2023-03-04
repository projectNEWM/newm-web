import { Box, Stack } from "@mui/material";
import { Typography } from "elements";
import { Formik, FormikProps } from "formik";
import { selectSong } from "modules/song";
import { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import agreementPreview from "assets/images/artist-agreement-preview.jpg";
import ViewPDF from "../ViewPDF";
import CheckboxField from "../form/CheckboxField";

interface ConfirmContractProps {
  readonly songTitle: string;
  readonly isCoCreator?: boolean;
  readonly onConfirm: (value: boolean) => void;
}

interface FormValues {
  readonly hasViewedAgreement: boolean;
  readonly isCreator: boolean;
  readonly agreesToContract: boolean;
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
    hasViewedAgreement: false,
    isCreator: false,
    agreesToContract: false,
  };

  const handleChange = (values: FormValues) => {
    if (values.isCreator && values.agreesToContract) {
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
}) => {
  const { artistAgreement } = useSelector(selectSong);

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

      <Stack direction="column" mt={ 3 } spacing={ 2 }>
        <Typography variant="subtitle1" color="white" fontSize={ 12 }>
          <CheckboxField name="isCreator" sx={ { marginRight: 1.5 } } />

          { isCoCreator ? (
            <span>
              I confirm that I am the primary creator of{ " " }
              <strong>{ songTitle }</strong> and all mentioned collaborators are
              accurate.
            </span>
          ) : (
            <span>
              I confirm that I am the exclusive creator of{ " " }
              <strong>{ songTitle }.</strong>
            </span>
          ) }
        </Typography>

        <Typography variant="subtitle1" color="white" fontSize={ 12 }>
          <CheckboxField
            name="agreesToContract"
            sx={ { marginRight: 1.5 } }
            disabled={ !values.hasViewedAgreement }
          />
          <span style={ { opacity: values.hasViewedAgreement ? 1 : 0.5 } }>
            I have read and agree to this contract.
          </span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ConfirmContract;
