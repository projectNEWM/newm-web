import { createAction } from "@reduxjs/toolkit";

export const incrementNum = createAction<number>("increment");

export const decrementNum = createAction<number>("decrement");
