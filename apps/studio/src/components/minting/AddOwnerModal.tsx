import * as Yup from "yup";
import { FunctionComponent } from "react";
import { Form, Formik, FormikValues } from "formik";
import { Box, DialogProps, Stack, Typography } from "@mui/material";
import {
  Button,
  Dialog,
  DropdownSelectField,
  HorizontalLine,
  SwitchInputField,
  TextInputField,
} from "@newm-web/elements";
import { commonYupValidation } from "../../common";
import { useGetRolesQuery } from "../../modules/content";
import { CollaborationStatus } from "../../modules/song";

interface AddOwnerModalProps extends Omit<DialogProps, "onClose"> {
  readonly onClose: VoidFunction;
  readonly onSubmit: (values: FormikValues) => void;
}

/**
 * Allows adding an owner and/or creditor when minting a song.
 */
const AddOwnerModal: FunctionComponent<AddOwnerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { data: roles = [] } = useGetRolesQuery();

  const initialValues = {
    email: "",
    isCreator: false,
    isCredited: false,
    isRightsOwner: false,
    role: "",
    status: CollaborationStatus.Editing,
  };

  const validationSchema = Yup.object().shape({
    email: commonYupValidation.email,
    isCreator: Yup.boolean(),
    isCredited: Yup.boolean()
      .required()
      .test(
        "at-least-one-true",
        "Please enter valid featured artist, rights, or credits",
        (item, testContext) =>
          item ||
          testContext.parent.isRightsOwner ||
          testContext.parent.isFeatured
      ),
    isRightsOwner: Yup.boolean(),
    role: commonYupValidation.role(roles),
  });

  return (
    <Dialog
      aria-labelledby="modal-title"
      open={ open }
      fullWidth
      onClose={ onClose }
    >
      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ onSubmit }
      >
        { ({ errors, touched }) => (
          <Form>
            <Box
              sx={ {
                display: "flex",
                flexDirection: "column",
                p: 2,
                rowGap: 2.5,
              } }
            >
              <Typography id="modal-title" variant="body2">
                Add new
              </Typography>

              <Stack
                columnGap={ 2 }
                direction={ ["column", "row", "row"] }
                rowGap={ 2 }
              >
                <TextInputField
                  isOptional={ false }
                  label="EMAIL"
                  name="email"
                  placeholder="john.smith@gmail.com"
                />

                <DropdownSelectField
                  isOptional={ false }
                  label="ROLE"
                  name="role"
                  options={ roles }
                  placeholder="Select role"
                />
              </Stack>

              <HorizontalLine />

              <SwitchInputField
                description={ "Is this individual a featured artist?" }
                name="isFeatured"
                title="FEATURED ARTIST"
              />

              <SwitchInputField
                description="Should this person receive a percentage of royalties generated?"
                name="isRightsOwner"
                title="ROYALTY SPLITS"
              />

              <SwitchInputField
                description={
                  "Did they have a role in making the song? Enable to credit " +
                  "them as a contributor."
                }
                name="isCredited"
                title="CREDITS"
              />

              { touched.isCredited && errors.isCredited ? (
                <Typography color="error" variant="h5">
                  { errors.isCredited }
                </Typography>
              ) : null }

              <HorizontalLine />

              <Stack
                sx={ {
                  alignItems: "center",
                  columnGap: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                } }
              >
                <Button variant="outlined" width="compact" onClick={ onClose }>
                  Cancel
                </Button>
                <Button type="submit" width="compact">
                  Add
                </Button>
              </Stack>
            </Box>
          </Form>
        ) }
      </Formik>
    </Dialog>
  );
};

export default AddOwnerModal;
