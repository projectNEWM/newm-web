import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { UseWrappedThunkResponse } from "./types";

/**
 * Wraps a thunk so that it can be used as a hook that returns
 * a function to call the thunk as well as the loading status,
 * the thunk return value, success and error status.
 *
 * @param thunk Thunk that should be wrapped with the hook.
 * @returns A function that returns the tuple: [wrapped thunk, { data, isError, isLoading, isSuccess }]
 */
export const asThunkHook = <Returned, Arg>(
  thunk: AsyncThunk<Returned, Arg, Record<string, unknown>>
) => {
  const useWrappedThunk = (): readonly [
    (arg: Arg) => Promise<void>,
    UseWrappedThunkResponse<Returned>
  ] => {
    const [data, setData] = useState<Returned>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const callHook = useCallback(
      async (arg: Arg) => {
        setIsLoading(true);
        try {
          const action = thunk(arg) as any; // eslint-disable-line
          const result = (await dispatch(action)) as PayloadAction<Returned>;

          // Check if the thunk execution was successful
          if (thunk.fulfilled.match(result)) {
            setData(result.payload);
            setIsSuccess(true);
          } else {
            setIsSuccess(false);
          }
        } catch (error) {
          setIsError(true);
          setIsSuccess(false);
        } finally {
          setIsLoading(false);
        }
      },
      [dispatch]
    );

    return [callHook, { data, isError, isLoading, isSuccess }];
  };

  return useWrappedThunk;
};
