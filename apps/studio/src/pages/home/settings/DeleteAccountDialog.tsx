import { Box, Stack, Typography } from "@mui/material";
import { Button, Dialog, TextInputField } from "@newm-web/elements";
import { Form, Formik, FormikValues } from "formik";
import { FunctionComponent, useState } from "react";
import * as Yup from "yup";
import theme from "@newm-web/theme";
import {
  emptyProfile,
  useDeleteAccountThunk,
  useGetProfileQuery,
} from "../../../modules/session";

const DeleteAccountDialog: FunctionComponent = () => {
  const deleteAccountPhrase = "YES";
  const regExpPhrase = new RegExp(`^${deleteAccountPhrase}$`);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: { id } = emptyProfile } = useGetProfileQuery();

  const [deleteAccount, { isLoading }] = useDeleteAccountThunk();

  const initialValues = {
    confirmationStatement: "",
  };

  const validationSchema = Yup.object().shape({
    confirmationStatement: Yup.string()
      .required(`Must type the word "${deleteAccountPhrase}"`)
      .matches(regExpPhrase, `Must type the word "${deleteAccountPhrase}"`),
  });

  const handleSubmit = ({ confirmationStatement }: FormikValues) => {
    if (confirmationStatement === deleteAccountPhrase) {
      deleteAccount({ id });
      setIsModalOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };

  const handleOpenDialog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button color="magazine" variant="secondary" onClick={ handleOpenDialog }>
        Delete account
      </Button>
      <Dialog open={ isModalOpen } onClose={ handleCloseDialog }>
        <Formik
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={ handleSubmit }
        >
          { () => (
            <Form>
              <Box
                sx={ {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                  <TextInputField name="confirmationStatement" />
                </Stack>

                <Stack
                  sx={ {
                    alignItems: "end",
                    columnGap: 1.5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    pt: 1.5,
                  } }
                >
                  <Button
                    color="music"
                    disabled={ isLoading }
                    variant="secondary"
                    width="compact"
                    onClick={ handleCloseDialog }
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={ isLoading }
                    sx={ { background: theme.colors.red } }
                    type="submit"
                    width="compact"
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
