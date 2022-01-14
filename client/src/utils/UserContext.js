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
  return useContext(UserContext);
}

function useProvideUser() {
  const [user, setUser] = useState({});
  const [login] = useMutation(LOGIN_USER);

  const handleSigin = async (formState) => {
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      setUser(data.login);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    user,
    handleSigin,
  };
}

export { ProvideUser, useUser };
