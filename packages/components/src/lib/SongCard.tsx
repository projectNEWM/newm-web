import { type KeyboardEvent, MouseEvent, useCallback } from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { bgImage } from "@newm-web/assets";
import {
  formatNewmAmount,
  getImageSrc,
  resizeCloudinaryImage,
} from "@newm-web/utils";
import { Clickable, ResponsiveImage } from "@newm-web/elements";
import currency from "currency.js";
import SongCardSkeleton from "./skeletons/SongCardSkeleton";

interface SongCardProps {
  readonly audioProgress?: number;
  readonly coverArtUrl?: string;
  readonly imageDimensions?: number;
  readonly isLoading?: boolean;
  readonly isPlayable?: boolean;
  readonly isPlaying?: boolean;
  readonly onCardClick?: () => void;
  readonly onPlayPauseClick?: () => void;
  readonly onSubtitleClick?: () => void;
  readonly priceInNewm?: number;
  readonly priceInUsd?: number;
  readonly subtitle?: string;
  readonly title?: string;
}

const SongCard = ({
  coverArtUrl,
  audioProgress = 0,
  imageDimensions = 400,
  isLoading = false,
  isPlayable,
  isPlaying,
  onCardClick,
  onPlayPauseClick,
  onSubtitleClick,
  priceInNewm,
  priceInUsd,
  subtitle,
  title,
}: SongCardProps) => {
  const theme = useTheme();

  const handleCardClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onCardClick?.();
  };

  const handlePlayPauseClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onPlayPauseClick?.();
  };

  const handleSubtitleClick = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onSubtitleClick?.();
  };

  const handleKeyPress = useCallback(
    (action?: (e: MouseEvent | KeyboardEvent) => void) =>
      (event: KeyboardEvent) => {
        if ((event.key === "Enter" || event.key === " ") && action) {
          action(event);
        }
      },
    []
  );

  if (isLoading) {
    return (
      <SongCardSkeleton
        isPriceVisible={ !!priceInNewm || !!priceInUsd }
        isSubtitleVisible={ !!subtitle }
        isTitleVisible={ !!title }
      />
    );
  }

  return (
    <Clickable
      sx={ {
        display: "flex",
        justifyContent: "flex-start",
        position: "relative",
        width: "100%",
      } }
      onClick={ onCardClick ? handleCardClick : undefined }
      onKeyDown={ handleKeyPress(onCardClick ? handleCardClick : undefined) }
    >
      <Stack sx={ { rowGap: 0.5 } } width="100%">
        <Stack alignItems="center" justifyItems="center" position="relative">
          <ResponsiveImage
            aria-label="Song cover art"
            src={
              coverArtUrl
                ? resizeCloudinaryImage(coverArtUrl, {
                    height: imageDimensions,
                    width: imageDimensions,
                  })
                : getImageSrc(bgImage)
            }
            sx={ {
              borderRadius: "4px",
              objectFit: "cover",
            } }
          />

          <Box
            alignItems="center"
            bottom={ 0 }
            display="flex"
            flexDirection="column"
            justifyContent="center"
            left={ 0 }
            position="absolute"
            right={ 0 }
            top={ 0 }
          >
            { !!isPlayable && (
              <IconButton
                aria-label={ `${isPlaying ? "Stop" : "Play"} song` }
                sx={ {
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.025)",
                  },
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: theme.colors.white,
                  transition: "transform 100ms",
                } }
                onClick={ handlePlayPauseClick }
                onKeyDown={ handleKeyPress(handlePlayPauseClick) }
              >
                { isPlaying ? (
                  <Stop sx={ { fontSize: ["40px", "40px", "60px"] } } />
                ) : (
                  <PlayArrow sx={ { fontSize: ["40px", "40px", "60px"] } } />
                ) }
              </IconButton>
            ) }
          </Box>

          { isPlaying && (
            <LinearProgress
              color="success"
              sx={ {
                backgroundColor: theme.colors.grey500,
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                height: "4px",
                marginTop: "-4px",
                width: "100%",
              } }
              value={ audioProgress }
              variant="determinate"
            />
          ) }
        </Stack>
        <Stack
          direction="column"
          gap={ 0.5 }
          justifyContent="space-between"
          mt={ 0.5 }
        >
          <Stack direction="row" gap={ 1 } justifyContent="space-between">
            { !!title && (
              <Typography fontWeight={ 700 } textAlign="left" variant="h4">
                { title }
              </Typography>
            ) }

            <Stack display="flex" flexDirection="row" whiteSpace="nowrap">
              { !!priceInNewm && (
                <Typography
                  fontSize={ title ? "14px" : "16px" }
                  fontWeight={ 700 }
                  sx={ { opacity: 0.9 } }
                  textAlign="right"
                  variant="h4"
                >
                  { formatNewmAmount(priceInNewm) }
                </Typography>
              ) }
              { !!priceInUsd && (
                <Typography
                  fontSize={ title ? "14px" : "15px" }
                  variant="subtitle1"
                >
                  &nbsp;(≈ { currency(priceInUsd).format() })
                </Typography>
              ) }
            </Stack>
          </Stack>

          { !!subtitle && (
            <Typography
              fontWeight={ 500 }
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
              textAlign="left"
              variant="subtitle1"
              onClick={ handleSubtitleClick }
              onKeyDown={ handleKeyPress(handleSubtitleClick) }
            >
              { subtitle }
            </Typography>
          ) }
        </Stack>
      </Stack>
    </Clickable>
  );
};

export default SongCard;
