import * as Yup from 'yup';
import { FunctionComponent } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import { Box, DialogProps, Stack, Typography } from '@mui/material';
import { Button, Dialog, HorizontalLine } from '@newm.io/studio/elements';
import {
  DropdownSelectField,
  SwitchInputField,
  TextInputField,
} from '@newm.io/studio/components';
import { commonYupValidation } from '@newm.io/studio/common';
import { useGetRolesQuery } from '@newm.io/studio/modules/content';
import { CollaborationStatus } from '@newm.io/studio/modules/song';

interface AddOwnerModalProps extends Omit<DialogProps, 'onClose'> {
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
    email: '',
    isCreator: false,
    isRightsOwner: false,
    isCredited: false,
    role: '',
    status: CollaborationStatus.Editing,
  };

  const validationSchema = Yup.object().shape({
    email: commonYupValidation.email,
    isCredited: Yup.boolean()
      .required()
      .test(
        'at-least-one-true',
        'Please enter valid featured artist, rights, or credits',
        (item, testContext) =>
          item ||
          testContext.parent.isRightsOwner ||
          testContext.parent.isFeatured
      ),
    isRightsOwner: Yup.boolean(),
    isCreator: Yup.boolean(),
    role: commonYupValidation.role(roles),
  });

  return (
    <Dialog
      aria-labelledby="modal-title"
      fullWidth
      onClose={onClose}
      open={open}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                rowGap: 2,
              }}
            >
              <Typography variant="body2" id="modal-title">
                Add new
              </Typography>

              <TextInputField
                isOptional={false}
                label="EMAIL"
                name="email"
                placeholder="john.smith@gmail.com"
                widthType="full"
              />

              <HorizontalLine mt={2} />

              <SwitchInputField
                name="isFeatured"
                title="FEATURED ARTIST"
                description={'Is this individual a featured artist?'}
              />

              <SwitchInputField
                name="isRightsOwner"
                title="ROYALTY SPLITS"
                description="Should this person receive a percentage of royalties generated?"
              />

              <SwitchInputField
                name="isCredited"
                title="CREDITS"
                description={
                  'Did they have a role in making the song? Enable to credit ' +
                  'them as a contributor.'
                }
              />

              {touched.isCredited && errors.isCredited ? (
                <Typography variant="h5" color="error">
                  {errors.isCredited}
                </Typography>
              ) : null}

              <DropdownSelectField
                label="ROLE"
                isOptional={false}
                name="role"
                options={roles}
                placeholder="Select role"
                widthType="full"
              />

              <HorizontalLine mt={2} />

              <Stack
                sx={{
                  alignItems: 'center',
                  columnGap: 3,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button variant="outlined" width="compact" onClick={onClose}>
                  Cancel
                </Button>
                <Button width="compact" type="submit">
                  Add
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddOwnerModal;
