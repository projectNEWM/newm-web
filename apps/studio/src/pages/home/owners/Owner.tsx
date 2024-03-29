import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { bgImage } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { resizeCloudinaryImage, useWindowDimensions } from "@newm-web/utils";
import { ItemHeader, ProfileHeader } from "@newm-web/components";
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
    instagramUrl = "",
    lastName,
    location = "",
    nickname,
    pictureUrl = "",
    role,
    twitterUrl = "",
    verificationStatus,
    websiteUrl = "",
  } = ownerData;

  const isVerified = verificationStatus === VerificationStatus.Verified;
  const isWidthAboveSm =
    windowWidth && windowWidth > theme.breakpoints.values.sm;

  const socials = {
    instagramUrl,
    websiteUrl,
    xUrl: twitterUrl,
  };

  const optimizedBannerImageUrl = bannerUrl
    ? resizeCloudinaryImage(bannerUrl, { height: 200, width: 1600 })
    : bgImage;

  return (
    <Stack direction="column">
      <Box pb={ 4 }>
        <ItemHeader title="ARTIST PAGE" onGoBack={ history.back } />
      </Box>

      <Box
        aria-label="Artist banner"
        sx={ {
          backgroundImage: `url(${optimizedBannerImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: isWidthAboveSm ? "200px" : "130px",
          width: "100%",
        } }
      />

      <ProfileHeader
        firstName={ firstName }
        isVerified={ isVerified }
        lastName={ lastName }
        location={ location }
        profileImageUrl={ pictureUrl }
        socials={ socials }
        onClickAbout={ () => setIsModalOpen(!isModalOpen) }
      />

      <Songs />

      <OwnerModal
        biography={ biography }
        nickname={ nickname }
        open={ isModalOpen }
        role={ role }
        socials={ socials }
        onClose={ () => setIsModalOpen(false) }
      />
    </Stack>
  );
};

export default Owner;
