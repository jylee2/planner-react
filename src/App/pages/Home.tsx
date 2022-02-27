import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Reducer, { initialState } from "../utils/useStoreReducer";
import { ACTION } from "../types/types";

const HomePage = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const navigate = useNavigate();
  console.log("--------state", state);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return navigate("/login");
    }

    dispatch({ type: ACTION.LOGIN, payload: jwt });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
