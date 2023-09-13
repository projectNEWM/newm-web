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
import AddSongIcon from "assets/images/AddSong";
import CheckCircleIcon from "assets/images/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { AudioVisualizer } from "react-audio-visualize";
import { Howl } from "howler";
import { getFileBinary } from "common";
import IconMessage from "./IconMessage";
import DashedOutline from "./styled/DashedOutline";
import ErrorMessage from "./styled/ErrorMessage";
import SolidOutline from "./styled/SolidOutline";

interface UploadSongProps {
  readonly errorMessage?: string;
  readonly file?: File;
  readonly onChange: (file: File) => void;
  readonly onBlur: VoidFunction;
  readonly onError: (message: string) => void;
}

interface SongProgressOverlayProps {
  readonly progress: number;
  readonly isPlaying: boolean;
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
  const [song, setSong] = useState<Howl | null>(null);
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

    song.stop();
  };

  /**
   * Stop playing song when component umounts
   */
  useEffect(() => {
    return () => {
      song?.stop();
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

          return audioBuffer.duration >= AUDIO_MIN_DURATION_SEC;
        };

        const isValidAudioDuration = await isAudioDurationValid(firstFile);

        if (!isValidAudioDuration) {
          throw new Error(`Must be at least ${AUDIO_MIN_DURATION_SEC} seconds`);
        }

        onChange(firstFile);
        onError("");

        // stop current song if it's playing
        if (song?.playing()) song.stop();
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
    onDrop: handleDrop,
    multiple: false,
    accept: {
      "audio/flac": [".flac"],
      "audio/wav": [".wav"],
    },
  });

  /**
   * Set playable audio when file is uploaded or changed.
   */
  useEffect(() => {
    const setBase64AudioString = async () => {
      if (!file) return;

      const binary = (await getFileBinary(file)) as string;
      const howler = new Howl({
        src: binary,
        onplay: () => setIsSongPlaying(true),
        onend: () => {
          setIsSongPlaying(false);
          setSongProgress(0);
        },
        onstop: () => {
          setIsSongPlaying(false);
          setSongProgress(0);
        },
      });

      setSong(howler);
    };

    setBase64AudioString();
  }, [file]);

  /**
   * Update song progress each second.
   */
  useEffect(() => {
    const getSongProgress = () => {
      if (!song) {
        return 0;
      }

      const songDuration = song.duration();
      const songPosition = song.seek();
      return songPosition / songDuration;
    };

    const interval = setInterval(() => {
      const songProgress = getSongProgress();
      setSongProgress(songProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, [song]);

  return (
    <Stack direction="column" spacing={ 1 } alignItems="center">
      <Box
        { ...getRootProps() }
        sx={ {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 100,
          width: "100%",
          maxWidth: theme.inputField.maxWidth,
          cursor: "pointer",
        } }
      >
        <input { ...getInputProps() } />

        { file ? (
          <SolidOutline
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
            sx={ {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            } }
          >
            <Box position="relative">
              <AudioVisualizer
                ref={ visualizerRef }
                blob={ file }
                width={ 338 }
                height={ 90 }
                barWidth={ 1 }
                gap={ 0 }
                barColor={ theme.colors.grey100 }
                style={ { opacity: 0.2, marginLeft: 2 } }
              />

              <Box
                position="absolute"
                display="flex"
                top={ 0 }
                right={ 0 }
                bottom={ 0 }
                left={ 0 }
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="stretch"
                zIndex={ 10 }
              >
                <SongProgressOverlay
                  progress={ songProgress }
                  isPlaying={ isSongPlaying }
                />

                { isHovering ? (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flex={ 1 }
                    mx="2px"
                  >
                    <Box
                      display="flex"
                      flex={ 1 }
                      justifyContent="center"
                      alignItems="center"
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
                      display="flex"
                      flex={ 1 }
                      justifyContent="center"
                      alignItems="center"
                      onClick={ isSongPlaying ? handleStopSong : handlePlaySong }
                      sx={ {
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                      } }
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
                  <IconMessage icon={ <CheckCircleIcon /> } message={ file.name } />
                ) }
              </Box>
            </Box>
          </SolidOutline>
        ) : (
          <DashedOutline sx={ { display: "flex", flexGrow: 1 } }>
            <IconMessage
              icon={ <AddSongIcon /> }
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
      position="absolute"
      top={ 0 }
      bottom={ 0 }
      left={ 0 }
      width={ progressPercentage }
      marginLeft="2px"
      zIndex={ -10 }
      sx={ {
        opacity: 0.5,
        backgroundColor: theme.colors.black,
        transition: isPlaying ? "width 1s linear" : "width 0",
      } }
    />
  );
};

export default UploadSong;
