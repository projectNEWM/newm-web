import { AsyncThunk } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Wraps a thunk so that it can be used as a hook that returns
 * a function to call the thunk and a loading status.
 *
 * @param thunk thunk that should be wrapped with the hook
 * @returns a function that returns the touple: [wrapped thunk, loading status]
 */
export const asThunkHook = <T>(
  thunk: AsyncThunk<void, T, Record<string, unknown>>
) => {
  const useWrappedThunk = (): readonly [(arg: T) => void, boolean] => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const callHook = useCallback(
      async (arg: T) => {
        setIsLoading(true);

        await dispatch(thunk(arg));

        setIsLoading(false);
      },
      [dispatch, setIsLoading]
    );

    return [callHook, isLoading];
  };

  return useWrappedThunk;
};
