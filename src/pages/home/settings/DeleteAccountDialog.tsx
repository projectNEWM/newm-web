import { Box, Stack, Typography } from "@mui/material";
import { TextInputField } from "components";
import { Button, Dialog } from "elements";
import { Form, Formik, FormikValues } from "formik";
import { FunctionComponent, useState } from "react";
import * as Yup from "yup";
import theme from "theme";

const DeleteAccountDialog: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    confirmationStatement: "",
  };

  const validationSchema = Yup.object().shape({
    confirmationStatement: Yup.string()
      .required("confirmation statement is a required field")
      .matches(/YES/, "Must type the word \"YES\" in all caps"),
  });

  const handleSubmit = (values: FormikValues) => {
    // TODO handle deletion of account, send appropriate response
    setIsModalOpen(false);
  };
  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };

  const handleOpenDialog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={ handleOpenDialog } variant="secondary" color="magazine">
        Delete account
      </Button>
      <Dialog open={ isModalOpen }>
        <Formik
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          validationSchema={ validationSchema }
        >
          { () => (
            <Form>
              <Box
                sx={ {
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  p: 3,
                  rowGap: 2,
                } }
              >
                <Stack sx={ { rowGap: 1 } }>
                  <Typography variant="body2">
                    You can still turn back...
                  </Typography>
                  <Typography variant="subtitle1">
                    Once you delete your profile it&apos;s gone for good. If
                    you&apos;re sure and would like to proceed, please confirm
                    by typing &ldquo;YES&rdquo; below.
                  </Typography>
                </Stack>
                <Stack
                  sx={ {
                    display: "flex",
                    justifyContent: "start",
                  } }
                >
                  <TextInputField name="confirmationStatement"></TextInputField>
                </Stack>

                <Stack
                  sx={ {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "end",
                    columnGap: 1.5,
                    pt: 1.5,
                  } }
                >
                  <Button
                    variant="secondary"
                    color="music"
                    width="compact"
                    onClick={ handleCloseDialog }
                  >
                    Cancel
                  </Button>
                  <Button
                    width="compact"
                    type="submit"
                    sx={ { background: theme.colors.red } }
                  >
                    Delete account
                  </Button>
                </Stack>
              </Box>
            </Form>
          ) }
        </Formik>
      </Dialog>
    </>
  );
};

export default DeleteAccountDialog;
