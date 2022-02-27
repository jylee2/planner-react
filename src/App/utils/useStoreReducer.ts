import { ReducerAction, ReducerState, ACTION } from "../types/types";

export const initialState: ReducerState = {
  loggedInUser: null,
  jwt: null,
};

const Reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ACTION.LOGIN:
      return {
        ...state,
        loggedInUser: action.payload,
        jwt: null,
      };
    case ACTION.LOGOUT:
      return {
        ...initialState,
        loggedInUser: null,
        jwt: null,
      };
    default:
      return state;
  }
};

export default Reducer;
