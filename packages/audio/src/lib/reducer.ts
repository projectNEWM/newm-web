import { Action, StoreState } from "./types";

export const initialStoreState = { num: 0 };

const reducer = (state: StoreState, action: Action) => {
  switch (action.type) {
    case "increment":
      return { num: state.num + action.payload };
    case "decrement":
      return { num: state.num - action.payload };
    default:
      return state;
  }
};

export default reducer;
