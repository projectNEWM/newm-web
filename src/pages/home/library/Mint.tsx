import {
  Box,
  FormControlLabel,
  Button as MUIButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router";
import { useWindowDimensions } from "common";
import {
  Alert,
  Button,
  Checkbox,
  HorizontalLine,
  Switch,
  TextInput,
  Typography,
} from "elements";
import theme from "theme";
import { Song } from "modules/song";
import { ChangeEvent, useEffect, useState } from "react";
import AddOwnerModal from "../uploadSong/AddOwnerModal";

interface FutureOwner {
  email: string;
  firstName: string;
  isCreator: boolean;
  isRightsOwner: boolean;
  lastName: string;
  percentage: number;
  role: string;
}

const Mint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { id = "", title } = location.state as Song;

  const [isExclusiveCreator, setIsExclusiveCreator] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [isMintSwitchOn, setIsMintSwitchOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isFullyOwned, setIsFullyOwned] = useState(false);
  const [futureOwners, setFutureOwners] = useState<FutureOwner[]>([]);
  const [futureCreditors, setFutureCreditors] = useState<
    Partial<FutureOwner>[]
  >([]);

  const handleSubmit = () => {
    // Potentially filter out futureOwners who have 0% ownership
    // to prevent them from being marked as owners
    // eslint-disable-next-line no-console
    console.log("Do something with this ID:", id);
  };

  const handlePercentageChange = (
    event: ChangeEvent<HTMLInputElement>,
    email: string
  ) => {
    const newState: FutureOwner[] = [...futureOwners];
    const index = newState.findIndex(
      (owner: FutureOwner) => owner.email === email
    );

    newState[index].percentage = event.target.valueAsNumber;

    setFutureOwners(newState);
  };

  useEffect(() => {
    setIsFullyOwned(
      futureOwners.reduce(
        (acc, { percentage }) => (isNaN(percentage) ? acc : acc + percentage),
        0
      ) === 100
    );
  }, [futureOwners]);

  return (
    <Box sx={ { maxWidth: "700px" } }>
      { showWarning && (
        <Stack sx={ { mt: 2 } }>
          <Alert
            action={
              <MUIButton
                aria-label="close"
                color="info"
                onClick={ () => {
                  setShowWarning(false);
                } }
                sx={ { textTransform: "none" } }
              >
                Dismiss
              </MUIButton>
            }
          >
            <Typography color="baseBlue" fontWeight={ 500 } variant="subtitle1">
              These details cannot be changed after minting.
            </Typography>
          </Alert>
        </Stack>
      ) }

      { isFirstStep ? (
        <>
          <Box
            sx={ {
              backgroundColor: theme.colors.grey600,
              mt: 4,
              p: 3,
            } }
          >
            <Stack
              spacing={ 1 }
              sx={ {
                alignItems: "center",
                display: "flex",
                flexDirection: [null, null, "row"],
                justifyContent: "space-between",
              } }
            >
              <Stack spacing={ 1 } sx={ { maxWidth: "500px" } }>
                <Typography>Mint Song</Typography>
                <Typography fontSize={ 12 } variant="subtitle1">
                  Minting a song will create an NFT that reflects ownership,
                  making streaming royalties purchasable. Once a song is minted,
                  it cannot be deleted.
                </Typography>
              </Stack>

              <Switch
                checked={ isMintSwitchOn }
                onChange={ () => {
                  setIsMintSwitchOn(!isMintSwitchOn);
                } }
                sx={ { mt: [2, 2, 0] } }
              />
            </Stack>

            { isMintSwitchOn && (
              <>
                <HorizontalLine sx={ { my: 4 } } />

                { futureOwners.length ? (
                  <>
                    <Stack flexDirection="row" justifyContent="space-between">
                      <Typography color="grey100" variant="h5">
                        MASTER OWNERS
                      </Typography>
                      <Typography color="grey100" variant="h5">
                        SHARES
                      </Typography>
                    </Stack>
                    { futureOwners.map((owner: FutureOwner) => (
                      <Stack
                        key={ owner.email }
                        sx={ {
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mt: 1.5,
                        } }
                      >
                        <Stack>
                          <Typography>{ `${owner.firstName} ${owner.lastName}` }</Typography>
                          <Typography variant="subtitle1">
                            { owner.email }
                          </Typography>
                        </Stack>
                        <Stack flexDirection="row" alignItems="center">
                          <TextInput
                            max={ 100 }
                            min={ 0 }
                            onChange={ (event) =>
                              handlePercentageChange(event, owner.email)
                            }
                            placeholder="0 %"
                            style={ { maxWidth: "100px" } }
                            type="number"
                          />
                          <Button
                            color="white"
                            sx={ { ml: 3 } }
                            variant="outlined"
                            width="icon"
                            onClick={ () => {
                              setFutureOwners(
                                futureOwners.filter(
                                  (futureOwner) =>
                                    futureOwner.email !== owner.email
                                )
                              );
                            } }
                          >
                            <CloseIcon sx={ { color: theme.colors.white } } />
                          </Button>
                        </Stack>
                      </Stack>
                    )) }
                    { !isFullyOwned && (
                      <Typography
                        color="red"
                        fontSize="12px"
                        mt={ 1 }
                        textAlign="end"
                      >
                        100% ownership must be distributed.
                      </Typography>
                    ) }

                    <HorizontalLine sx={ { my: 4 } } />
                  </>
                ) : null }

                { futureCreditors.length ? (
                  <>
                    <Typography color="grey100" mb={ -0.5 } variant="h5">
                      CREDITS TO SHOW ON SONG DETAIL
                    </Typography>
                    { futureCreditors.map((owner) => (
                      <Stack
                        key={ owner.email }
                        sx={ {
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mt: 2,
                        } }
                      >
                        <Stack>
                          <Typography>{ `${owner.firstName} ${owner.lastName}` }</Typography>
                          <Typography variant="subtitle1">
                            { owner.email }
                          </Typography>
                        </Stack>
                        <Button
                          color="white"
                          sx={ { ml: 3 } }
                          variant="outlined"
                          width="icon"
                          onClick={ () => {
                            setFutureCreditors(
                              futureCreditors.filter(
                                (futureOwner) =>
                                  futureOwner.email !== owner.email
                              )
                            );
                          } }
                        >
                          <CloseIcon sx={ { color: theme.colors.white } } />
                        </Button>
                      </Stack>
                    )) }

                    <HorizontalLine sx={ { my: 4 } } />
                  </>
                ) : null }
                <Stack>
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
                </Stack>
              </>
            ) }
          </Box>

          <Stack direction="row" columnGap={ 2 } mt={ 5 }>
            <Button
              onClick={ () => navigate(-1) }
              variant="secondary"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              Cancel
            </Button>

            { isMintSwitchOn && (
              <Button
                disabled={ !isFullyOwned }
                onClick={ () => {
                  setIsFirstStep(false);
                } }
                width={
                  windowWidth && windowWidth > theme.breakpoints.values.md
                    ? "compact"
                    : "default"
                }
              >
                Next
              </Button>
            ) }
          </Stack>
        </>
      ) : (
        <>
          <Stack sx={ { mt: 4, rowGap: 2 } }>
            <Typography>ONE LAST THING</Typography>
            <Typography variant="subtitle1">
              You&apos;re almost ready to mint! To proceed please review your
              ownership contract and follow the steps below.
            </Typography>
          </Stack>
          <Typography
            color="grey100"
            fontWeight={ 500 }
            sx={ { mt: 4 } }
            variant="h5"
          >
            View your contract here.
          </Typography>
          <p>PLACEHOLDER: INSERT CONTRACT HERE</p>
          <Stack mt={ 4 } rowGap={ 2 }>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ isExclusiveCreator }
                  onChange={ () => {
                    setIsExclusiveCreator(!isExclusiveCreator);
                  } }
                />
              }
              label={ `I confirm that I am the exclusive creator of ${title}.` }
              sx={ { display: "flex", columnGap: 1.5, ml: 0, fontWeight: "400" } }
              componentsProps={ {
                typography: {
                  variant: "subtitle1",
                  sx: { fontSize: "12px", color: "white" },
                },
              } }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ hasAgreedToTerms }
                  onChange={ () => {
                    setHasAgreedToTerms(!hasAgreedToTerms);
                  } }
                />
              }
              label="By 'Requesting Minting' you agree to this contract."
              sx={ { columnGap: 1.5, display: "flex", fontWeight: "400", ml: 0 } }
              componentsProps={ {
                typography: {
                  sx: { fontSize: "12px", color: "white" },
                  variant: "subtitle1",
                },
              } }
            />
          </Stack>
          <Typography
            color="white"
            fontWeight={ 400 }
            sx={ { mt: 4 } }
            variant="subtitle1"
          >
            The minting process has a fee of ₳6.00 and may take 3-15 days to
            complete.
          </Typography>
          <HorizontalLine sx={ { my: 4 } } />
          <Stack alignItems="center" columnGap={ 2 } direction="row" mt={ 5 }>
            <Button
              onClick={ () => {
                setIsFirstStep(true);
              } }
              variant="secondary"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              Previous
            </Button>

            <Button
              disabled={ !(hasAgreedToTerms && isExclusiveCreator) }
              onClick={ handleSubmit }
              type="submit"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              Request Minting
            </Button>
          </Stack>
        </>
      ) }
      <AddOwnerModal
        open={ isModalOpen }
        onClose={ () => {
          setIsModalOpen(false);
        } }
        onSubmit={ ({
          email,
          firstName,
          isCreator,
          isRightsOwner,
          lastName,
          role,
        }) => {
          if (!futureCreditors.find((owner) => owner.email === email)) {
            if (isCreator) {
              setFutureCreditors([
                ...futureCreditors,
                {
                  email,
                  firstName,
                  isCreator,
                  isRightsOwner,
                  lastName,
                  role,
                },
              ]);
            }
            if (isRightsOwner) {
              setFutureOwners([
                ...futureOwners,
                {
                  email,
                  firstName,
                  isCreator,
                  isRightsOwner,
                  lastName,
                  percentage: 0,
                  role,
                },
              ]);
            }
          }

          setIsModalOpen(false);
        } }
      />
    </Box>
  );
};

export default Mint;
