import { FunctionComponent, ReactNode, useReducer } from "react";
import AudioContext from "./AudioContext";
import reducer, { initialState } from "./reducer";

interface AudioProviderProps {
  readonly children: ReactNode;
}

const AudioProvider: FunctionComponent<AudioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AudioContext.Provider value={ { dispatch, state } }>
      { children }
    </AudioContext.Provider>
  );
};

export default AudioProvider;
