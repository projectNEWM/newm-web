import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

/**
 * Use instead of useDispatch to ensure dispatch is typed correctly
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use instead of useSelector to ensure it is typed correctly
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
