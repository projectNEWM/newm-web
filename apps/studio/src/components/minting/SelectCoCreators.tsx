import { IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import {
  Button,
  HorizontalLine,
  Tooltip,
  Typography,
} from "@newm-web/elements";
import { Formik, FormikProps } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import theme from "@newm-web/theme";
import { formatPriceToDecimal, usePrevious } from "@newm-web/utils";
import AddOwnerModal from "./AddOwnerModal";
import FeaturedArtists from "./FeaturedArtists";
import {
  Creditor,
  Featured,
  Owner,
  useGetMintSongEstimateQuery,
} from "../../modules/song";
import { Creditors, Owners } from "../../components";

interface FormValues {
  readonly creditors: ReadonlyArray<Creditor>;
  readonly featured: ReadonlyArray<Featured>;
  readonly owners: ReadonlyArray<Owner>;
}

interface SelectCoCreatorsProps {
  readonly creditors: ReadonlyArray<Creditor>;
  readonly featured: ReadonlyArray<Featured>;
  readonly isAddDeleteDisabled?: boolean;
  readonly onChangeCreditors: (newCreditors: ReadonlyArray<Creditor>) => void;
  readonly onChangeFeatured: (newFeatured: ReadonlyArray<Featured>) => void;
  readonly onChangeOwners: (newOwners: ReadonlyArray<Owner>) => void;
  readonly owners: ReadonlyArray<Owner>;
}

interface FormContentProps extends FormikProps<FormValues> {
  readonly isAddDeleteDisabled?: boolean;
}

/**
 * Add, update, and remove owners and creditors when minting a song.
 */
const SelectCoCeators: FunctionComponent<SelectCoCreatorsProps> = ({
  owners,
  creditors,
  featured,
  onChangeOwners,
  onChangeCreditors,
  onChangeFeatured,
  isAddDeleteDisabled = false,
}) => {
  const initialValues = {
    creditors,
    featured,
    owners,
  };

  const handleSubmit = (values: FormValues) => {
    onChangeOwners(values.owners);
    onChangeCreditors(values.creditors);
    onChangeFeatured(values.featured);
  };

  return (
    <Formik
      initialValues={ initialValues }
      enableReinitialize
      onSubmit={ handleSubmit }
    >
      { (formikProps) => (
        <FormContent
          { ...formikProps }
          isAddDeleteDisabled={ isAddDeleteDisabled }
        />
      ) }
    </Formik>
  );
};

const FormContent: FunctionComponent<FormContentProps> = ({
  values,
  setFieldValue,
  handleSubmit,
  isAddDeleteDisabled,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevValues = usePrevious(values);
  const { data: songEstimate } = useGetMintSongEstimateQuery({
    collaborators: 1,
  });

  /**
   * Call onChange callbacks when form values change.
   */
  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(prevValues)) {
      handleSubmit();
    }
  }, [values, prevValues, handleSubmit]);

  return (
    <Stack pb={ 2 } px={ 2 }>
      { !!values.owners.length && (
        <>
          <HorizontalLine sx={ { my: 5 } } />

          <Owners
            isDeleteDisabled={ isAddDeleteDisabled }
            owners={ values.owners }
            onDelete={ ({ email }, owners) => {
              const newOwners = owners.filter((owner) => owner.email !== email);
              setFieldValue("owners", newOwners);
            } }
          />
        </>
      ) }

      { !!values.creditors.length && (
        <>
          <HorizontalLine sx={ { my: 5 } } />

          <Creditors
            creditors={ values.creditors }
            isDeleteDisabled={ isAddDeleteDisabled }
            onDelete={ ({ email }, creditors) => {
              const newCreditors = creditors.filter(
                (creditor) => creditor.email !== email
              );

              setFieldValue("creditors", newCreditors);
            } }
          />
        </>
      ) }

      { !!values.featured.length && (
        <>
          <HorizontalLine sx={ { my: 5 } } />

          <Typography color="grey100" mb={ -0.5 } variant="h5">
            FEATURED ARTISTS
          </Typography>

          <FeaturedArtists
            featured={ values.featured }
            isDeleteDisabled={ isAddDeleteDisabled }
            onDelete={ ({ email }, featured) => {
              const newFeaturedArtists = featured.filter(
                (featured) => featured.email !== email
              );

              setFieldValue("featured", newFeaturedArtists);
            } }
          />
        </>
      ) }

      { !isAddDeleteDisabled && (
        <Stack>
          <HorizontalLine sx={ { mb: 2.5, mt: 5 } } />

          <Button
            color="white"
            variant="outlined"
            width="full"
            onClick={ () => {
              setIsModalOpen(true);
            } }
          >
            Add new owner
          </Button>

          <Typography mr={ 2 } mt={ 1.5 } variant="subtitle2">
            { `For every additional artist who will receive royalties, the
              fee to complete the minting process will increase by ≈₳${
                formatPriceToDecimal(songEstimate?.collabPriceAda) || "N/A"
              }.` }
            <Tooltip
              title={
                "This cost is increased with each additional artist because " +
                "this ADA needs to travel with each portion of stream tokens in order " +
                "to complete the split, which is an added extra cost for each transaction."
              }
            >
              <IconButton sx={ { ml: 0.5, padding: 0 } }>
                <HelpIcon
                  sx={ {
                    color: theme.colors.grey100,
                    height: "18px",
                    width: "18px",
                  } }
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Stack>
      ) }

      <AddOwnerModal
        open={ isModalOpen }
        onClose={ () => {
          setIsModalOpen(false);
        } }
        onSubmit={ ({
          email,
          isCreator,
          isRightsOwner,
          isCredited,
          isFeatured,
          role,
          status,
        }) => {
          const hasCreditorBeenAdded = values.creditors.find(
            (creditor) => creditor.email === email
          );
          const hasOwnerBeenAdded = values.owners.find(
            (owner) => owner.email === email
          );
          const hasFeaturedBeenAdded = values.featured.find(
            (featuredArtist) => featuredArtist.email === email
          );

          if (isRightsOwner && !hasOwnerBeenAdded) {
            setFieldValue("owners", [
              ...values.owners,
              {
                email,
                isCreator,
                isRightsOwner,
                percentage: 0,
                role,
                status,
              },
            ]);
          }

          if (isCredited && !hasCreditorBeenAdded) {
            setFieldValue("creditors", [
              ...values.creditors,
              {
                email,
                isCredited,
                role,
                status,
              },
            ]);
          }

          if (isFeatured && !hasFeaturedBeenAdded) {
            setFieldValue("featured", [
              ...values.featured,
              {
                email,
                isFeatured,
                role,
                status,
              },
            ]);
          }

          setIsModalOpen(false);
        } }
      />
    </Stack>
  );
};

export default SelectCoCeators;
