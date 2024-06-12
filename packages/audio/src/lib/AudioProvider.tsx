import { FunctionComponent, ReactNode, useReducer } from "react";
import AudioContext from "./AudioContext";
import reducer, { initialStoreState } from "./reducer";

interface AudioProviderProps {
  readonly children: ReactNode;
}

const AudioProvider: FunctionComponent<AudioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStoreState);

  const audioState = { dispatch, state };

  return (
    <AudioContext.Provider value={ audioState }>{ children }</AudioContext.Provider>
  );
};

export default AudioProvider;
