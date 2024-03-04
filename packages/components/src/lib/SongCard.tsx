import { type KeyboardEvent, useCallback, useEffect, useState } from "react";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { bgImage } from "@newm-web/assets";
import {
  getImageSrc,
  getResizedAlbumCoverImageUrl,
  useWindowDimensions,
} from "@newm-web/utils";
import { SongCardSkeleton } from "@newm-web/elements";

interface SongCardProps {
  coverArtUrl?: string;
  isPlayable?: boolean;
  isPlaying?: boolean;
  onPlayPauseClick?: () => void;
  onPriceClick?: () => void;
  onSubtitleClick?: () => void;
  onTitleClick?: () => void;
  price?: string;
  subtitle: string;
  title: string;
}

export const SongCard = ({
  coverArtUrl,
  title,
  isPlayable,
  isPlaying,
  onTitleClick,
  onPlayPauseClick,
  onPriceClick,
  onSubtitleClick,
  price,
  subtitle,
}: SongCardProps) => {
  const theme = useTheme();
  const windowWidth = useWindowDimensions()?.width;

  const [isWidthAboveMd, setIsWidthAboveMd] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (windowWidth !== undefined) {
      setIsLoading(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    setIsWidthAboveMd(
      !!(windowWidth && windowWidth > theme.breakpoints.values.md)
    );
  }, [theme.breakpoints.values.md, windowWidth]);

  const handlePriceClick = () => {
    onPriceClick?.();
  };

  const handleTitleClick = () => {
    onTitleClick?.();
  };

  const handleSubtitleClick = () => {
    onSubtitleClick?.();
  };

  const handleKeyPress = useCallback(
    (action?: () => void) => (event: KeyboardEvent<HTMLDivElement>) => {
      if ((event.key === "Enter" || event.key === " ") && action) {
        action();
      }
    },
    []
  );

  const commonPriceStyles = {
    alignSelf: "start",
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: "6px",
    gridArea: "1 / 1 / 2 / 2",
    justifySelf: "end",
    margin: [0.5, 1],
    px: 1,
    py: 0.5,
  };

  if (isLoading) {
    return <SongCardSkeleton />;
  }

  return (
    <Stack sx={ { maxWidth: ["150px", "150px", "260px"], rowGap: 0.5 } }>
      <Stack alignItems="center" display="grid" justifyItems="center">
        <img
          alt="Song cover art"
          height={ isWidthAboveMd ? 260 : 150 }
          src={
            coverArtUrl
              ? getResizedAlbumCoverImageUrl(coverArtUrl, {
                  height: 200,
                  width: 200,
                })
              : getImageSrc(bgImage)
          }
          style={ {
            borderRadius: "4px",
            gridArea: "1 / 1 / 2 / 2",
            objectFit: "cover",
          } }
          width={ isWidthAboveMd ? 260 : 150 }
        />
        { isPlayable && (
          <IconButton
            aria-label={ `${isPlaying ? "Stop" : "Play"} song` }
            sx={ {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              color: theme.colors.white,
              gridArea: "1 / 1 / 2 / 2",
            } }
            onClick={ onPlayPauseClick }
          >
            { isPlaying ? (
              <Stop sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } } />
            ) : (
              <PlayArrow sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } } />
            ) }
          </IconButton>
        ) }
        { price && (
          <Stack
            role="button"
            sx={
              onPriceClick
                ? {
                    "&:active": {
                      background: "rgba(0, 0, 0, 0.6)",
                    },
                    "&:focus": {
                      boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.5)",
                      outline: "none",
                    },
                    "&:hover": {
                      background: "rgba(0, 0, 0, 0.5)",
                    },
                    cursor: "pointer",
                    ...commonPriceStyles,
                  }
                : commonPriceStyles
            }
            tabIndex={ onPriceClick ? 0 : undefined }
            onClick={ onPriceClick ? handlePriceClick : undefined }
            onKeyDown={
              onPriceClick ? handleKeyPress(handlePriceClick) : undefined
            }
          >
            <Typography fontWeight={ 700 } variant="h4">
              { price } Ɲ
            </Typography>
          </Stack>
        ) }
      </Stack>
      <Typography
        fontWeight={ 700 }
        mt={ 0.5 }
        role={ onTitleClick ? "button" : undefined }
        sx={
          onTitleClick
            ? {
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
                width: "fit-content",
              }
            : undefined
        }
        tabIndex={ onTitleClick ? 0 : undefined }
        variant="h4"
        onClick={ onTitleClick ? handleTitleClick : undefined }
        onKeyDown={ onTitleClick ? handleKeyPress(handleTitleClick) : undefined }
      >
        { title }
      </Typography>
      <Typography
        fontWeight={ 500 }
        mt={ 0.5 }
        role={ onSubtitleClick ? "button" : undefined }
        sx={
          onSubtitleClick
            ? {
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
                width: "fit-content",
              }
            : undefined
        }
        tabIndex={ onSubtitleClick ? 0 : undefined }
        variant="subtitle1"
        onClick={ onSubtitleClick ? handleSubtitleClick : undefined }
        onKeyDown={
          onSubtitleClick ? handleKeyPress(handleSubtitleClick) : undefined
        }
      >
        { subtitle }
      </Typography>
    </Stack>
  );
};
