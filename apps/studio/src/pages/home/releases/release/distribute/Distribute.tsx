import { useLocation, useNavigate } from "react-router-dom";

import { Form, Formik } from "formik";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Stack, Typography } from "@mui/material";

import * as Yup from "yup";

import { Button } from "@newm-web/elements";
import ConfirmAgreement from "./ConfirmAgreement";
import DistributionAlerts from "./DistributionAlerts";
import { TrackDistributeFormValues } from "./types";
import { commonYupValidation } from "../../../../../common";

interface DistributeLocationState {
  readonly isMinting?: boolean;
  readonly title?: string;
}

const Distribute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMinting = false, title = "" } =
    (location.state as DistributeLocationState) || {};

  const initialValues: TrackDistributeFormValues = {
    consentsToContract: false,
    title,
  };

  return (
    <Formik
      enableReinitialize={ true }
      initialValues={ initialValues }
      validationSchema={ Yup.object().shape({
        consentsToContract: commonYupValidation.consentsToContract,
      }) }
      onSubmit={ (_, helpers) => {
        helpers.setSubmitting(false);
      } }
    >
      { () => (
        <Form noValidate>
          <Stack spacing={ 4 }>
            <Stack alignItems="center" direction="row" gap={ 2.5 }>
              <Button
                color="white"
                variant="outlined"
                width="icon"
                onClick={ () => navigate(-1) }
              >
                <ArrowBackIcon />
              </Button>
              <Typography variant="h3">DISTRIBUTE RELEASE</Typography>
            </Stack>

            <Box pb={ 7 } pt={ 2 }>
              <Stack spacing={ 4 }>
                <DistributionAlerts isMinting={ isMinting } />
                <ConfirmAgreement />
              </Stack>
            </Box>
          </Stack>
        </Form>
      ) }
    </Formik>
  );
};

export default Distribute;
