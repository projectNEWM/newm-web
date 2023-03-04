import * as Yup from "yup";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Form, Formik, FormikValues } from "formik";
import { Box, DialogProps, Stack, Typography } from "@mui/material";
import { Button, Dialog, HorizontalLine } from "elements";
import {
  DropdownSelectField,
  SwitchInputField,
  TextInputField,
} from "components";
import { commonYupValidation } from "common";
import { selectContent } from "modules/content";
import theme from "theme";

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
  const { roles } = useSelector(selectContent);

  const initialValues = {
    email: "",
    firstName: "",
    isCreator: false,
    isRightsOwner: false,
    lastName: "",
    role: "",
  };

  const validationSchema = Yup.object().shape({
    email: commonYupValidation.email,
    firstName: commonYupValidation.firstName,
    isCreator: Yup.boolean()
      .required()
      .test(
        "at-least-one-true",
        "Rights or Credits must be true",
        (item, testContext) => item || testContext.parent.isRightsOwner
      ),
    isRightsOwner: Yup.boolean(),
    lastName: commonYupValidation.lastName,
    role: commonYupValidation.role(roles),
  });

  return (
    <Dialog
      aria-labelledby="modal-title"
      fullWidth
      onClose={ onClose }
      open={ open }
      sx={ {
        "& .MuiPaper-root": {
          backgroundColor: theme.colors.grey600,
        },
      } }
    >
      <Formik
        initialValues={ initialValues }
        onSubmit={ onSubmit }
        validationSchema={ validationSchema }
      >
        { ({ errors, touched }) => (
          <Form>
            <Box
              sx={ {
                display: "flex",
                flexDirection: "column",
                p: 2,
                rowGap: 2,
              } }
            >
              <Typography variant="body2" id="modal-title">
                Add new
              </Typography>

              <Stack direction="row" columnGap={ 1.5 }>
                <TextInputField
                  label="FIRST NAME"
                  name="firstName"
                  placeholder="John"
                />
                <TextInputField
                  label="LAST NAME"
                  name="lastName"
                  placeholder="Smith"
                />
              </Stack>
              <TextInputField
                label="EMAIL"
                name="email"
                placeholder="john.smith@gmail.com"
                widthType="full"
              />

              <HorizontalLine mt={ 2 } />

              <SwitchInputField
                name="isRightsOwner"
                title="IP RIGHTS"
                description="Does this person own IP rights to this song?"
              />

              <SwitchInputField
                name="isCreator"
                title="CREDITS"
                description={
                  "Did they have a role in making the song? Enable to credit " +
                  "them as a contributor."
                }
              />

              { touched.isCreator && errors.isCreator ? (
                <Typography variant="h5" color="error">
                  { errors.isCreator }
                </Typography>
              ) : null }

              <DropdownSelectField
                label="ROLE"
                name="role"
                options={ roles }
                placeholder="Select role"
                widthType="full"
              />

              <HorizontalLine mt={ 2 } />

              <Stack
                sx={ {
                  alignItems: "center",
                  columnGap: 4,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                } }
              >
                <Button variant="outlined" width="compact" onClick={ onClose }>
                  Cancel
                </Button>
                <Button width="compact" type="submit">
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
