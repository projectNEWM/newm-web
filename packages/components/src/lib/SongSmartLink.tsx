import { Link } from "@mui/material";
import { SpotifyLogo } from "@newm-web/assets";
import {
  MusicService,
  SongSmartLink as SongSmartLinkType,
} from "@newm-web/types";
import { FunctionComponent } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storeNameIconMap: Record<string, any> = {
  [MusicService.Spotify]: <SpotifyLogo />,
};

const SongSmartLink: FunctionComponent<SongSmartLinkType> = ({
  storeName,
  url,
}) => {
  const icon = storeNameIconMap[storeName];

  if (!icon) {
    return null;
  }

  return (
    <Link href={ url } rel="noopener noreferrer" target="_blank">
      { icon }
    </Link>
  );
};

export default SongSmartLink;
