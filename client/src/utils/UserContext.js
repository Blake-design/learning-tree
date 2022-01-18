import React, { useContext, createContext, useState } from "react";
import Auth from "./auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

const UserContext = createContext();

function ProvideUser({ children }) {
  const menu = useProvideUser();
  return <UserContext.Provider value={menu}>{children}</UserContext.Provider>;
}

function useUser() {
  /// use context calls a function that will create the context
  return useContext(UserContext);
}

function useProvideUser() {
  const [user, setUser] = useState({});
  const [login] = useMutation(LOGIN_USER);

  const handleSignIn = async (formState) => {
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      console.log("this is data return by login " + data);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    user,
    handleSignIn,
  };
}

export { ProvideUser, useUser };
