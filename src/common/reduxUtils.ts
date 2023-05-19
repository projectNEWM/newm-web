import { AsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface UseWrappedThunkResponse<Returned> {
  readonly isLoading: boolean;
  readonly data?: Returned;
}

export interface AsyncThunkActionWithPayload<Returned, Arg>
  extends AsyncThunkAction<Returned, Arg, Record<string, unknown>> {
  payload: Returned;
}

/**
 * Wraps a thunk so that it can be used as a hook that returns
 * a function to call the thunk as well as the loading status
 * and the thunk return value.
 *
 * @param thunk thunk that should be wrapped with the hook
 * @returns a function that returns the touple: [wrapped thunk, { loading, data }]
 */
export const asThunkHook = <Returned, Arg>(
  thunk: AsyncThunk<Returned, Arg, Record<string, unknown>>
) => {
  const useWrappedThunk = (): readonly [
    (arg: Arg) => void,
    UseWrappedThunkResponse<Returned>
  ] => {
    const resultRef = useRef<AsyncThunkActionWithPayload<Returned, Arg>>();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const callHook = useCallback(
      async (arg: Arg) => {
        setIsLoading(true);
        resultRef.current = (await dispatch(
          thunk(arg)
        )) as AsyncThunkActionWithPayload<Returned, Arg>;
        setIsLoading(false);
      },
      [dispatch, setIsLoading]
    );

    return [callHook, { isLoading, data: resultRef.current?.payload }];
  };

  return useWrappedThunk;
};
