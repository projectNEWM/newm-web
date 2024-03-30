import { type KeyboardEvent, MouseEvent, useCallback, useRef } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import { bgImage } from "@newm-web/assets";
import { getImageSrc, resizeCloudinaryImage } from "@newm-web/utils";
import { Clickable, SongCardSkeleton } from "@newm-web/elements";

interface SongCardProps {
  readonly coverArtUrl?: string;
  readonly isLoading?: boolean;
  readonly isPlayable?: boolean;
  readonly isPlaying?: boolean;
  readonly onCardClick?: () => void;
  readonly onPlayPauseClick?: () => void;
  readonly onPriceClick?: () => void;
  readonly onSubtitleClick?: () => void;
  readonly price?: string;
  readonly subtitle?: string;
  readonly title?: string;
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
  isLoading = true,
}: SongCardProps) => {
  const theme = useTheme();
  const imageRef = useRef<HTMLImageElement>(null);

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
    (action?: (e: MouseEvent | KeyboardEvent) => void) =>
      (event: KeyboardEvent) => {
        if ((event.key === "Enter" || event.key === " ") && action) {
          action(event);
        }
      },
    []
  );

  const commonPriceStyles = {
    alignSelf: "start",
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: "6px",
    justifySelf: "end",
    margin: [0.5, 1],
    px: 1,
    py: 0.5,
  };

  if (isLoading) {
    return (
      <SongCardSkeleton
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
    >
      <Stack sx={ { rowGap: 0.5 } } width="100%">
        <Stack alignItems="center" justifyItems="center" position="relative">
          <Box
            aria-label="Song cover art"
            component="img"
            height="100%"
            ref={ imageRef }
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
              objectFit: "cover",
            } }
            width="100%"
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
                onClick={ onPlayPauseClick ? handlePlayPauseClick : undefined }
                onKeyDown={ handleKeyPress(handlePlayPauseClick) }
              >
                { isPlaying ? (
                  <Stop sx={ { fontSize: ["40px", "40px", "60px"] } } />
                ) : (
                  <PlayArrow sx={ { fontSize: ["40px", "40px", "60px"] } } />
                ) }
              </IconButton>
            ) }
            { !!price && (
              <Stack
                left={ 0 }
                position="absolute"
                right={ 0 }
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
                top={ 0 }
                onClick={ onPriceClick ? handlePriceClick : undefined }
                onKeyDown={ handleKeyPress(handlePriceClick) }
              >
                <Typography fontWeight={ 700 } variant="h4">
                  { price } Ɲ
                </Typography>
              </Stack>
            ) }
          </Box>
        </Stack>
        { !!title && (
          <Typography fontWeight={ 700 } mt={ 0.5 } textAlign="left" variant="h4">
            { title }
          </Typography>
        ) }
        { !!subtitle && (
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
            textAlign="left"
            variant="subtitle1"
            onClick={ onSubtitleClick ? handleSubtitleClick : undefined }
            onKeyDown={ handleKeyPress(handleSubtitleClick) }
          >
            { subtitle }
          </Typography>
        ) }
      </Stack>
    </Clickable>
  );
};
