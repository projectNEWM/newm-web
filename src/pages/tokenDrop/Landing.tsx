import { Box, IconButton, Stack, useTheme } from "@mui/material";
import QuestionIcon from "assets/images/QuestionIcon";
import {
  Checkbox,
  DropdownSelect,
  FilledButton,
  HorizontalLine,
  Tooltip,
  Typography,
} from "elements";
import { FunctionComponent, useMemo, useState } from "react";
import artistAssets from "assets/artists";
import PlayIcon from "assets/images/PlayIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import { useNavigate } from "react-router-dom";
import StopIcon from "assets/images/StopIcon";
import { DisplayText, SectionHeading } from "components";
import { Howl } from "howler";
import { projectDetails } from "buildParams";
import poolPmIcon from "assets/images/pool-pm-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  PurchaseStatus,
  parseBundleAmounts,
  selectSale,
  selectSalesFor,
  setSelectedBundleId,
} from "modules/sale";
import { selectWallet } from "modules/wallet";

const Landing: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adaUsdRate } = useSelector(selectWallet);
  const { selectedBundleId, purchaseStatus } = useSelector(selectSale);
  const sales = useSelector(selectSalesFor(projectDetails.projectId));
  const selectedSale = sales.find(({ id }) => id === selectedBundleId);
  const bundleAmounts = parseBundleAmounts(selectedSale, adaUsdRate);

  const isPending = purchaseStatus === PurchaseStatus.Pending;
  const isProcessing = purchaseStatus === PurchaseStatus.Processing;
  const activePurchase = isPending || isProcessing;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const audio = useMemo(
    () =>
      new Howl({
        src: artistAssets.preview,
        onplay: () => setIsPlaying(true),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      }),
    []
  );

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNavigate = () => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    audio.stop();
    navigate("payment");
  };

  const getDropdownOptions = () => {
    if (!sales.length) return [];

    const single = Math.min(...sales.map((sale) => sale.amount));

    return sales.map((sale) => {
      const bundleSize = Math.floor(sale.amount / single);

      return {
        label: bundleSize + (bundleSize === 1 ? " bundle" : " bundles"),
        value: sale.id,
      };
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={ 3.5 } sx={ { maxWidth: [9999, 9999, 620] } }>
        <Typography variant="subtitle1" sx={ { whiteSpace: "pre-wrap" } }>
          { projectDetails.description }
        </Typography>
        <Typography variant="subtitle1" sx={ { mt: 2, whiteSpace: "pre-wrap" } }>
          Explore the legal side of how Stream Tokens and royalties work in this
          sample sale prior to purchasing&nbsp;
          <a
            target="_blank"
            href={ projectDetails.royaltyAgreement }
            rel="noreferrer noopener"
            style={ { color: theme.colors.grey100 } }
          >
            here
          </a>
          .
        </Typography>
      </Box>

      <Stack
        spacing={ 2.5 }
        alignItems="flex-start"
        width="100%"
        maxWidth={ [9999, 9999, 478] }
      >
        <Box width="100%">
          <SectionHeading>AVAILABLE SONG</SectionHeading>

          <Box display="flex" alignItems="center" position="relative">
            <Box
              sx={ {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: theme.colors.grey600,
                borderRadius: "6px",
                overflow: "hidden",
                p: 1.25,
                pr: 2,
              } }
            >
              <Stack spacing={ 2 } direction="row" alignItems="center">
                <Box
                  display="flex"
                  height={ 2 }
                  width={ 2 }
                  margin={ 2 }
                  justifyContent="center"
                  alignItems="center"
                >
                  { isPlaying ? (
                    <IconButton
                      aria-label="stop song"
                      onClick={ () => audio.stop() }
                    >
                      <StopIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="play song"
                      onClick={ () => audio.play() }
                    >
                      <PlayIcon />
                    </IconButton>
                  ) }
                </Box>

                <img
                  src={ artistAssets.albumArtXs }
                  style={ { width: 40, height: 40, borderRadius: "50%" } }
                  alt="artist profile"
                />

                <Box>
                  <Typography variant="h4" fontWeight={ 700 }>
                    { projectDetails.songName }
                  </Typography>
                  <Typography variant="subtitle2">
                    { projectDetails.artistName }
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={ 2 } direction="row">
                <a
                  href={ projectDetails.poolLink }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Cardano logo"
                    src={ poolPmIcon }
                    width={ 27 }
                    height={ 27 }
                  />
                </a>

                <a
                  href={ projectDetails.spotifyLink }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpotifyIcon />
                </a>
              </Stack>
            </Box>
            <Tooltip
              title={
                "Click the circular pink logo (next to Spotify icon) " +
                "to view what Stream Tokens look like on the blockchain."
              }
            >
              <IconButton
                sx={ {
                  pr: [0, 0, ".5rem"],
                  py: 0,
                  position: ["relative", "relative", "absolute"],
                  right: [0, 0, "-2.5rem"],
                  top: [0, 0, "50%"],
                  transform: ["none", "none", "translateY(-50%)"],
                } }
              >
                <QuestionIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <HorizontalLine />

        <Box width="100%">
          <Box mb={ 1 }>
            <SectionHeading>WHAT YOU CAN OWN</SectionHeading>
          </Box>

          <Stack direction="row" spacing={ 1.5 } justifyContent="flex-start">
            <Box flexDirection="column">
              <Box mb={ 0.25 }>
                <DropdownSelect
                  label=""
                  name="bundles"
                  disabled={ activePurchase }
                  value={ selectedBundleId }
                  placeholder="1 bundle"
                  handleChange={ (option) => {
                    dispatch(setSelectedBundleId(option.value));
                  } }
                  options={ getDropdownOptions() }
                />
              </Box>

              <Typography variant="subtitle1" sx={ { paddingLeft: 1.5 } }>
                { bundleAmounts.adaPrice.toLocaleString() } ADA
              </Typography>
            </Box>

            <DisplayText
              style={ {
                display: "flex",
                height: "45px",
                alignItems: "center",
                color: theme.colors.grey100,
              } }
            >
              =
            </DisplayText>

            <Box flexDirection="column">
              <Box
                mb={ 0.25 }
                sx={ {
                  position: "relative",
                  display: "flex",
                  height: "45px",
                  alignItems: "center",
                } }
              >
                <DisplayText style={ { color: theme.colors.grey100 } }>
                  { bundleAmounts.size.toLocaleString() } stream{ " " }
                  <span style={ { whiteSpace: "nowrap" } }>
                    tokens
                    <Tooltip
                      title={
                        bundleAmounts.royaltyPercentage
                          ? `${bundleAmounts.size.toLocaleString()} stream ` +
                            `tokens are equal to ${bundleAmounts.royaltyPercentage}% ` +
                            "of future streaming royalties. See FAQ for more."
                          : "Unable to fetch tooltip data"
                      }
                    >
                      <IconButton
                        sx={ {
                          py: 0,
                          position: ["relative", "relative", "absolute"],
                          right: [0, 0, "-2.5rem"],
                          top: [0, 0, "50%"],
                          transform: ["none", "none", "translateY(-50%)"],
                        } }
                      >
                        <QuestionIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                </DisplayText>
              </Box>

              <Typography variant="subtitle1">of the song NFT</Typography>
            </Box>
          </Stack>
        </Box>

        <HorizontalLine />

        <Stack spacing={ 2.5 } sx={ { width: "100%" } }>
          <Stack
            alignItems="center"
            columnGap={ 1.5 }
            flexDirection="row"
            mt={ 1.5 }
          >
            <Checkbox
              ariaDescribedBy="terms"
              checked={ isChecked }
              onChange={ handleChange }
            />
            <Typography variant="subtitle2" id="terms">
              I agree that I have read and accepted NEWM&apos;s&nbsp;
              <a
                href="https://newm.io/terms-of-service"
                rel="noreferrer noopener"
                style={ { color: theme.colors.grey100 } }
                target="_blank"
              >
                Terms of Service
              </a>
              .
            </Typography>
          </Stack>
          { !isChecked && !isInitialRender && (
            <Typography variant="subtitle2" sx={ { color: theme.colors.red } }>
              Please confirm you have read the Terms of Service.
            </Typography>
          ) }
          <FilledButton
            disabled={ !isChecked && !isInitialRender }
            fullWidth={ true }
            onClick={ handleNavigate }
            sx={ { mt: 1 } }
          >
            Start purchase
          </FilledButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Landing;
