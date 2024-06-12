import { Action, State } from "./types";

export const initialState: State = { num: 0 };

const reducer = (state: State, action: Action) => {
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
