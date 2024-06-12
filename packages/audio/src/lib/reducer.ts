import { PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "./types";

export const initialStoreState = { num: 0 };

const reducer = (state: StoreState, action: PayloadAction) => {
  switch (action.type) {
    case "increment":
      return { num: state.num + 1 };
    default:
      return state;
  }
};

export default reducer;
