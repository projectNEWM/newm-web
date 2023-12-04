import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TwitterLogo, GlobalFill } from "@newm-web/assets";
import { InstagramLogo } from "@newm-web/assets";
import { bgImage } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { getResizedAlbumCoverImageUrl } from "../../../common";
import { useWindowDimensions } from "@newm-web/utils";
import { history } from "../../../common/history";
import { VerificationStatus, useGetUserQuery } from "../../../modules/session";
import { Button, Typography } from "@newm-web/elements";
import { ProfileSkeleton } from "../../../components";
import Songs from "./Songs";
import OwnerModal from "./OwnerModal";

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
        sx={{
          columnGap: 2,
          flexDirection: ["column", "row"],
          pb: 4,
          rowGap: 2,
        }}
      >
        <Button
          color="white"
          onClick={() => history.back()}
          variant="outlined"
          width="icon"
        >
          <ArrowBackIcon sx={{ color: "white" }} />
        </Button>
        <Typography variant="h3">ARTIST PAGE</Typography>
      </Stack>
      <img
        alt="Artist banner"
        src={bannerUrl ? bannerUrl : bgImage}
        style={{
          objectFit: "cover",
          maxHeight: isWidthAboveSm ? "200px" : "100px",
        }}
        width="100%"
      />

      <Stack
        sx={{
          alignItems: "center",
          columnGap: 5,
          flexDirection: [null, null, "column", "row"],
          mt: -3.5,
          mx: 5,
        }}
      >
        <img
          alt="Artist profile"
          height={isWidthAboveSm ? "200px" : "100px"}
          width={isWidthAboveSm ? "200px" : "100px"}
          src={
            pictureUrl
              ? getResizedAlbumCoverImageUrl(pictureUrl, {
                  width: 200,
                  height: 200,
                })
              : bgImage
          }
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />

        <Stack
          sx={{
            alignItems: ["center", "center", "center", "initial"],
            alignSelf: [null, null, null, "flex-end"],
            mt: [2, 2, 2, 3.5],
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            gap={1.5}
            justifyContent={["center", "center", "center", "flex-start"]}
            textAlign={["center", "center", "center", "left"]}
          >
            <Typography variant="h3" fontWeight="700">
              {firstName || lastName
                ? `${firstName} ${lastName}`.toUpperCase()
                : "Name Unavailable"}
            </Typography>
            {isVerified ? <CheckCircleIcon color="success" /> : null}
          </Stack>
          {location && (
            <Typography
              mt={0.5}
              variant="subtitle1"
              textAlign={["center", "center", "center", "left"]}
            >
              {location}
            </Typography>
          )}
          <Stack
            sx={{ columnGap: 1.5, flexDirection: "row", mt: [2, 2, 2, 3.5] }}
          >
            <Button
              color="music"
              disabled={!(biography || role)}
              onClick={() => setIsModalOpen(!isModalOpen)}
              variant="secondary"
              width="compact"
            >
              About
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            alignSelf: [null, null, null, "flex-start"],
            columnGap: 1.5,
            flexDirection: "row",
            ml: [null, null, null, "auto"],
            mt: [2, 2, 2, 6],
          }}
        >
          <Button
            disabled={!websiteUrl}
            href={websiteUrl}
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
            width="icon"
          >
            <GlobalFill />
          </Button>
          <Button
            disabled={!twitterUrl}
            href={twitterUrl}
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
            width="icon"
          >
            <TwitterLogo />
          </Button>
          <Button
            disabled={!instagramUrl}
            href={instagramUrl}
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
        biography={biography}
        nickname={nickname}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        role={role}
      />
    </>
  );
};

export default Owner;
