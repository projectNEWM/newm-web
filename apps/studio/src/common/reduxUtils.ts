import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useAppDispatch } from './hooks';

interface UseWrappedThunkResponse<Returned> {
  readonly isLoading: boolean;
  readonly data?: Returned;
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
    (arg: Arg) => Promise<void>,
    UseWrappedThunkResponse<Returned>
  ] => {
    const [data, setData] = useState<Returned>();

    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const callHook = useCallback(
      async (arg: Arg) => {
        setIsLoading(true);
        const result = (await dispatch(thunk(arg))) as PayloadAction<Returned>;

        setData(result.payload);
        setIsLoading(false);
      },
      [dispatch, setIsLoading]
    );

    return [callHook, { isLoading, data }];
  };

  return useWrappedThunk;
};
