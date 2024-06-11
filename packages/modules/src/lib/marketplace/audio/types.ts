export interface AudioState {
  audio: Howl | undefined;
  audioProgress: number;
  audioUrl: string;
  isAudioPlaying: boolean;
}
