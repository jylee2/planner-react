import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Reducer, { initialState } from "../utils/useStoreReducer";
const HomePage = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.loggedInUser) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
