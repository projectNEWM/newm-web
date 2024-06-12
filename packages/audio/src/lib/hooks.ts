import { useCallback } from "react";
import { decrementNum, incrementNum } from "./actions";
import { useAudioContext } from "./AudioContext";

export const useNum = () => {
  const { state, dispatch } = useAudioContext();

  const increment = useCallback(() => {
    dispatch(incrementNum(1));
  }, [dispatch]);

  const decrement = useCallback(() => {
    dispatch(decrementNum(1));
  }, [dispatch]);

  return { decrement, increment, num: state.num };
};
