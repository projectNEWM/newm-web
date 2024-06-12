import { Dispatch } from "react";
import { decrementNum, incrementNum } from "./actions";

export type Action =
  | ReturnType<typeof incrementNum>
  | ReturnType<typeof decrementNum>;

export interface State {
  readonly num: number;
}

export interface Context {
  readonly dispatch: Dispatch<Action>;
  readonly state: State;
}
