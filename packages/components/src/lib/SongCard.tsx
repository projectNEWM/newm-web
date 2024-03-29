import {
  type KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { bgImage } from "@newm-web/assets";
import {
  getImageSrc,
  resizeCloudinaryImage,
  useWindowDimensions,
} from "@newm-web/utils";
import { Clickable, SongCardSkeleton } from "@newm-web/elements";

interface SongCardProps {
  coverArtUrl?: string;
  isPlayable?: boolean;
  isPlaying?: boolean;
  onCardClick?: () => void;
  onPlayPauseClick?: () => void;
  onPriceClick?: () => void;
  onSubtitleClick?: () => void;
  price?: string;
  subtitle: string;
  title: string;
}

export const SongCard = ({
  coverArtUrl,
  title,
  isPlayable,
  isPlaying,
  onCardClick,
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

  const handleCardClick = () => {
    onCardClick?.();
  };

  const handlePlayPauseClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onPlayPauseClick?.();
  };

  const handlePriceClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onPriceClick?.();
  };

  const handleSubtitleClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onSubtitleClick?.();
  };

  const handleKeyPress = useCallback(
    (action?: (event: MouseEvent | KeyboardEvent) => void) =>
      (event: KeyboardEvent) => {
        if ((event.key === "Enter" || event.key === " ") && action) {
          event.stopPropagation();
          action(event);
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
    <Clickable onClick={ handleCardClick }>
      <Stack sx={ { maxWidth: ["150px", "150px", "260px"], rowGap: 0.5 } }>
        <Stack alignItems="center" display="grid" justifyItems="center">
          <img
            alt="Song cover art"
            height={ isWidthAboveMd ? 260 : 150 }
            src={
              coverArtUrl
                ? resizeCloudinaryImage(coverArtUrl, {
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
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: theme.colors.white,
                gridArea: "1 / 1 / 2 / 2",
              } }
              onClick={ handlePlayPauseClick }
            >
              { isPlaying ? (
                <Stop sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } } />
              ) : (
                <PlayArrow
                  sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } }
                />
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
                        background: "rgba(0, 0, 0, 0.75)",
                      },
                      cursor: "pointer",
                      ...commonPriceStyles,
                    }
                  : commonPriceStyles
              }
              tabIndex={ onPriceClick ? 0 : undefined }
              onClick={ onPriceClick ? handlePriceClick : undefined }
              onKeyDown={ handleKeyPress(handlePriceClick) }
            >
              <Typography fontWeight={ 700 } variant="h4">
                { price } Ɲ
              </Typography>
            </Stack>
          ) }
        </Stack>
        <Typography fontWeight={ 700 } mt={ 0.5 } textAlign="left" variant="h4">
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
          onKeyDown={ handleKeyPress(handleSubtitleClick) }
        >
          { subtitle }
        </Typography>
      </Stack>
    </Clickable>
  );
};
