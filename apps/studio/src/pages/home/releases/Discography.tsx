import { FunctionComponent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { useFlags } from "launchdarkly-react-client-sdk";

import {
  GradientDashedOutline,
  IconMessage,
  Link,
  Tooltip,
} from "@newm-web/elements";
import { AddSong } from "@newm-web/assets";

import SongList from "./SongList";
import OfficialStatementCTA from "../../../components/OfficialStatementCTA";
import { DistributionPricingDialog, SearchBox } from "../../../components";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import { useGetSongCountQuery } from "../../../modules/song";

const Discography: FunctionComponent = () => {
  const navigate = useNavigate();
  // TODO(webStudioAlbumPhaseTwo): Remove flag once flag is retired.
  const { webStudioAlbumPhaseTwo, webStudioDisableDistributionAndSales } =
    useFlags();

  const {
    data: {
      dspPlanSubscribed: isArtistPricePlanSelected = false,
    } = emptyProfile,
  } = useGetProfileQuery();

  const [query, setQuery] = useState("");
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    ownerIds: ["me"],
    phrase: query,
  });

  const shouldGatePricingDialog = useMemo(() => {
    return webStudioAlbumPhaseTwo && !isArtistPricePlanSelected;
  }, [isArtistPricePlanSelected, webStudioAlbumPhaseTwo]);

  const handleSearch = (searched: string) => {
    setQuery(searched);
  };

  const handleCreateReleaseClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!webStudioAlbumPhaseTwo) return;
    if (!shouldGatePricingDialog) return;
    event.preventDefault();
    setIsPricingDialogOpen(true);
  };

  const handlePricingDialogCancel = () => {
    setIsPricingDialogOpen(false);
  };

  const handlePricingDialogConfirm = () => {
    setIsPricingDialogOpen(false);
    navigate("/home/releases/new");
  };

  return (
    <>
      { webStudioAlbumPhaseTwo && !isArtistPricePlanSelected && (
        <DistributionPricingDialog
          open={ isPricingDialogOpen }
          onCancel={ handlePricingDialogCancel }
          onConfirm={ handlePricingDialogConfirm }
        />
      ) }

      <Typography sx={ { pb: 4 } } variant="h3">
        RELEASES
      </Typography>

      <Box sx={ { mb: 5.5 } }>
        { webStudioDisableDistributionAndSales ? (
          <Tooltip title={ <OfficialStatementCTA /> }>
            <Box
              aria-disabled="true"
              aria-label="Create New Release"
              component="span"
              role="button"
              sx={ {
                cursor: "not-allowed",
                textDecoration: "none",
              } }
            >
              <GradientDashedOutline sx={ { padding: 3 } }>
                <IconMessage icon={ <AddSong /> } message="Create New Release" />
              </GradientDashedOutline>
            </Box>
          </Tooltip>
        ) : (
          <Link
            aria-label="Create New Release"
            sx={ { textDecoration: "none" } }
            to={
              webStudioAlbumPhaseTwo
                ? "/home/releases/new"
                : "/home/upload-song"
            }
            onClick={ handleCreateReleaseClick }
          >
            <GradientDashedOutline sx={ { padding: 3 } }>
              <IconMessage icon={ <AddSong /> } message="Create New Release" />
            </GradientDashedOutline>
          </Link>
        ) }
      </Box>

      { totalCountOfSongs || query ? (
        <SearchBox
          placeholder="Search by release title"
          query={ query }
          onSearch={ handleSearch }
        />
      ) : null }

      <SongList query={ query } totalCountOfSongs={ totalCountOfSongs } />
    </>
  );
};

export default Discography;
