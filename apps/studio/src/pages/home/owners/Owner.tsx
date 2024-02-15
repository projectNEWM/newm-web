import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  GlobalFill,
  InstagramLogo,
  TwitterLogo,
  bgImage,
} from "@newm-web/assets";
import theme from "@newm-web/theme";
import {
  getResizedAlbumCoverImageUrl,
  useWindowDimensions,
} from "@newm-web/utils";
import { Button, Typography } from "@newm-web/elements";
import Songs from "./Songs";
import OwnerModal from "./OwnerModal";
import { history } from "../../../common/history";
import { VerificationStatus, useGetUserQuery } from "../../../modules/session";
import { ProfileSkeleton } from "../../../components";

const Owner: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId = "" } = useParams();
  const windowWidth = useWindowDimensions()?.width;
  const { data: ownerData, isLoading, isError } = useGetUserQuery({ userId });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !ownerData) {
    history.push("/home/collaborators");

    return null;
  }

  const {
    bannerUrl,
    biography,
    firstName,
    instagramUrl,
    lastName,
    location,
    nickname,
    pictureUrl,
    role,
    twitterUrl,
    verificationStatus,
    websiteUrl,
  } = ownerData;

  const isVerified = verificationStatus === VerificationStatus.Verified;
  const isWidthAboveSm =
    windowWidth && windowWidth > theme.breakpoints.values.sm;

  return (
    <>
      <Stack
        sx={ {
          columnGap: 2,
          flexDirection: ["column", "row"],
          pb: 4,
          rowGap: 2,
        } }
      >
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => history.back() }
        >
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>
        <Typography variant="h3">ARTIST PAGE</Typography>
      </Stack>
      <img
        alt="Artist banner"
        src={ bannerUrl ? bannerUrl : bgImage }
        style={ {
          maxHeight: isWidthAboveSm ? "200px" : "100px",
          objectFit: "cover",
        } }
        width="100%"
      />

      <Stack
        sx={ {
          alignItems: "center",
          columnGap: 5,
          flexDirection: [null, null, "column", "row"],
          mt: -3.5,
          mx: 5,
        } }
      >
        <img
          alt="Artist profile"
          height={ isWidthAboveSm ? "200px" : "100px" }
          src={
            pictureUrl
              ? getResizedAlbumCoverImageUrl(pictureUrl, {
                  height: 200,
                  width: 200,
                })
              : bgImage
          }
          style={ { borderRadius: "50%", objectFit: "cover" } }
          width={ isWidthAboveSm ? "200px" : "100px" }
        />

        <Stack
          sx={ {
            alignItems: ["center", "center", "center", "initial"],
            alignSelf: [null, null, null, "flex-end"],
            mt: [2, 2, 2, 3.5],
          } }
        >
          <Stack
            alignItems="center"
            direction="row"
            gap={ 1.5 }
            justifyContent={ ["center", "center", "center", "flex-start"] }
            textAlign={ ["center", "center", "center", "left"] }
          >
            <Typography fontWeight="700" variant="h3">
              { firstName || lastName
                ? `${firstName} ${lastName}`.toUpperCase()
                : "Name Unavailable" }
            </Typography>
            { isVerified ? <CheckCircleIcon color="success" /> : null }
          </Stack>
          { location && (
            <Typography
              mt={ 0.5 }
              textAlign={ ["center", "center", "center", "left"] }
              variant="subtitle1"
            >
              { location }
            </Typography>
          ) }
          <Stack
            sx={ { columnGap: 1.5, flexDirection: "row", mt: [2, 2, 2, 3.5] } }
          >
            <Button
              color="music"
              disabled={ !(biography || role) }
              variant="secondary"
              width="compact"
              onClick={ () => setIsModalOpen(!isModalOpen) }
            >
              About
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={ {
            alignSelf: [null, null, null, "flex-start"],
            columnGap: 1.5,
            flexDirection: "row",
            ml: [null, null, null, "auto"],
            mt: [2, 2, 2, 6],
          } }
        >
          <Button
            disabled={ !websiteUrl }
            href={ websiteUrl }
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
            width="icon"
          >
            <GlobalFill />
          </Button>
          <Button
            disabled={ !twitterUrl }
            href={ twitterUrl }
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
            width="icon"
          >
            <TwitterLogo />
          </Button>
          <Button
            disabled={ !instagramUrl }
            href={ instagramUrl }
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
            width="icon"
          >
            <InstagramLogo />
          </Button>
        </Stack>
      </Stack>
      <Songs />
      <OwnerModal
        biography={ biography }
        nickname={ nickname }
        open={ isModalOpen }
        role={ role }
        onClose={ () => setIsModalOpen(false) }
      />
    </>
  );
};

export default Owner;
