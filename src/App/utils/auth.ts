import { AuthInputType } from "../types/types";

const auth = {
  login: async (input: AuthInputType) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: "include",
      }
    );

    const content = await response.json();

    if (content?.jwt) {
      localStorage.setItem("jwt", content.jwt);
    }

    return content;
  },
};

export default auth;
