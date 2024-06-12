import { useCallback } from "react";
import { incrementNum } from "./actions";
import { useAudioContext } from "./AudioContext";

export const useIncrement = () => {
  const { state, dispatch } = useAudioContext();

  const increment = useCallback(() => {
    dispatch(incrementNum());
  }, [dispatch]);

  return { increment, num: state.num };
};
