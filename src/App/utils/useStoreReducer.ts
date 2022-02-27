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
        loggedInUser: null,
        jwt: action.payload,
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
