import { createContext, useContext } from "react";
import { initialState } from "./reducer";
import { Context } from "./types";

const AudioContext = createContext<Context>({
  dispatch: () => {
    throw new Error("dispatch not initialized");
  },
  state: initialState,
});

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export default AudioContext;
