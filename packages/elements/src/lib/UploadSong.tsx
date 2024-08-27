import { Box, Stack } from "@mui/material";
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import { AddSong, CheckCircle } from "@newm-web/assets";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { AudioVisualizer } from "react-audio-visualize";
import IconMessage from "./IconMessage";
import DashedOutline from "./styled/DashedOutline";
import ErrorMessage from "./styled/ErrorMessage";
import SolidOutline from "./styled/SolidOutline";

interface UploadSongProps {
  readonly errorMessage?: string;
  readonly file?: File;
  readonly onBlur: VoidFunction;
  readonly onChange: (file: File) => void;
  readonly onError: (message: string) => void;
}

interface SongProgressOverlayProps {
  readonly isPlaying: boolean;
  readonly progress: number;
}

const AUDIO_MIN_DURATION_SEC = 60;
const AUDIO_MIN_FILE_SIZE_MB = 1;
const AUDIO_MAX_FILE_SIZE_GB = 1;

/**
 * Allows a user to upload a song by either clicking the area to
 * open the file browser or dropping it onto it.
 */
const UploadSong: FunctionComponent<UploadSongProps> = ({
  errorMessage,
  file,
  onChange,
  onBlur,
  onError,
}) => {
  const theme = useTheme();

  const [isHovering, setIsHovering] = useState(false);
  const [song, setSong] = useState<HTMLAudioElement | null>(null);
  const [songProgress, setSongProgress] = useState<number>(0);
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  const createAudioBuffer = async (value: File) => {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const arrayBuffer = await value.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  const isFileSizeValid = (value: File) => {
    const fileSizeInMB = value.size / (1000 * 1000);
    const fileSizeInGB = value.size / (1000 * 1000 * 1000);

    return (
      fileSizeInMB >= AUDIO_MIN_FILE_SIZE_MB &&
      fileSizeInGB <= AUDIO_MAX_FILE_SIZE_GB
    );
  };

  const handlePlaySong: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (!song) return;

    song.play();
  };

  const handleStopSong: MouseEventHandler = (event) => {
    event.stopPropagation();
    if (!song) return;

    song.pause();
    song.currentTime = 0;
  };

  /**
   * Stop playing song when component unmounts
   */
  useEffect(() => {
    return () => {
      if (song) {
        song.pause();
        song.currentTime = 0;
      }
    };
  }, [song]);

  // file validation hosted in component to prevent constant Yup validation
  const handleDrop = useCallback(
    async (
      acceptedFiles: ReadonlyArray<File>,
      fileRejections: ReadonlyArray<FileRejection>
    ) => {
      try {
        // Check if the file type is valid or display other file errors
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.code === "file-invalid-type") {
              throw new Error("File type must be .flac or .wav");
            } else {
              throw new Error(error.message);
            }
          });
        });

        const firstFile = acceptedFiles[0];

        // Check if the file size is valid
        const isValidFileSize = isFileSizeValid(firstFile);

        if (!isValidFileSize) {
          throw new Error(
            `Must be between ${AUDIO_MIN_FILE_SIZE_MB}MB and` +
              ` ${AUDIO_MAX_FILE_SIZE_GB}GB`
          );
        }

        // Check if the file duration is less than AUDIO_MIN_DURATION
        const isAudioDurationValid = async (value: File) => {
          const audioBuffer = await createAudioBuffer(value);

          return audioBuffer.duration > AUDIO_MIN_DURATION_SEC;
        };

        const isValidAudioDuration = await isAudioDurationValid(firstFile);

        if (!isValidAudioDuration) {
          throw new Error(`
            The track must be greater than ${AUDIO_MIN_DURATION_SEC} seconds in duration to be released as a single.
          `);
        }

        onChange(firstFile);
        onError("");

        // stop current song if it's playing
        if (song && !song.paused) song.pause();
      } catch (error) {
        if (error instanceof Error) {
          onError(error.message);
        }
      } finally {
        onBlur();
      }
    },
    [onChange, onError, song, onBlur]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/flac": [".flac"],
      "audio/wav": [".wav"],
    },
    multiple: false,
    onDrop: handleDrop,
  });

  /**
   * Set playable audio when file is uploaded or changed.
   */
  useEffect(() => {
    if (!file) return;

    const audio = new Audio();
    setSong(audio);

    audio.src = URL.createObjectURL(file);

    audio.addEventListener("ended", () => {
      setIsSongPlaying(false);
      setSongProgress(0);
    });

    audio.addEventListener("play", () => {
      setIsSongPlaying(true);
    });

    audio.addEventListener("pause", () => {
      setIsSongPlaying(false);
      setSongProgress(0);
    });
  }, [file]);

  /**
   * Update song progress each second.
   */
  useEffect(() => {
    const getSongProgress = () => {
      if (!song) {
        return 0;
      }

      const songDuration = song.duration;
      const songPosition = song.currentTime;
      return songPosition / songDuration;
    };

    const interval = setInterval(() => {
      const songProgress = getSongProgress();
      setSongProgress(songProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, [song]);

  return (
    <Stack alignItems="center" direction="column" spacing={ 1 }>
      <Box
        { ...getRootProps() }
        sx={ {
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 100,
          maxWidth: theme.inputField.maxWidth,
          width: "100%",
        } }
      >
        <input { ...getInputProps() } />

        { file ? (
          <SolidOutline
            sx={ {
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            } }
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
          >
            <Box position="relative">
              <AudioVisualizer
                barColor={ theme.colors.grey100 }
                barWidth={ 1 }
                blob={ file }
                gap={ 0 }
                height={ 90 }
                ref={ visualizerRef }
                style={ { marginLeft: 2, opacity: 0.2 } }
                width={ 338 }
              />

              <Box
                alignItems="stretch"
                bottom={ 0 }
                display="flex"
                height="100%"
                justifyContent="center"
                left={ 0 }
                position="absolute"
                right={ 0 }
                top={ 0 }
                width="100%"
                zIndex={ 10 }
              >
                <SongProgressOverlay
                  isPlaying={ isSongPlaying }
                  progress={ songProgress }
                />

                { isHovering ? (
                  <Box
                    display="flex"
                    flex={ 1 }
                    justifyContent="space-between"
                    mx="2px"
                  >
                    <Box
                      alignItems="center"
                      display="flex"
                      flex={ 1 }
                      justifyContent="center"
                      sx={ {
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                      } }
                    >
                      <IconMessage
                        icon={ <ChangeCircleIcon /> }
                        message="Change song"
                      />
                    </Box>

                    <Box
                      alignItems="center"
                      display="flex"
                      flex={ 1 }
                      justifyContent="center"
                      sx={ {
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                      } }
                      onClick={ isSongPlaying ? handleStopSong : handlePlaySong }
                    >
                      { isSongPlaying ? (
                        <IconMessage icon={ <StopIcon /> } message="Stop song" />
                      ) : (
                        <IconMessage
                          icon={ <PlayArrowIcon /> }
                          message="Play song"
                        />
                      ) }
                    </Box>
                  </Box>
                ) : isDragActive ? (
                  <IconMessage
                    icon={ <ChangeCircleIcon /> }
                    message="Drop your song here"
                  />
                ) : (
                  <IconMessage
                    icon={ <CheckCircle fill={ theme.colors.green } /> }
                    message={ file.name }
                  />
                ) }
              </Box>
            </Box>
          </SolidOutline>
        ) : (
          <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
            <IconMessage
              icon={ <AddSong /> }
              message="Drag and drop or browse your song"
              subtitle=".flac, .wav"
            />
          </DashedOutline>
        ) }
      </Box>

      <ErrorMessage align="center">{ errorMessage }</ErrorMessage>
    </Stack>
  );
};

const SongProgressOverlay: FunctionComponent<SongProgressOverlayProps> = ({
  progress,
  isPlaying,
}) => {
  const theme = useTheme();

  const progressPercentage = progress * 100 + "%";

  return (
    <Box
      bottom={ 0 }
      left={ 0 }
      marginLeft="2px"
      position="absolute"
      sx={ {
        backgroundColor: theme.colors.black,
        opacity: 0.5,
        transition: isPlaying ? "width 1s linear" : "width 0",
      } }
      top={ 0 }
      width={ progressPercentage }
      zIndex={ -10 }
    />
  );
};

export default UploadSong;
