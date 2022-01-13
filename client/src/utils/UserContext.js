import React, { createContext, useContext } from "react";

// Create our theme context using React.CreateContext()
export const UserContext = createContext();
const { Provider } = UserContext;

// Create a custom hook that allows easy access to our NameContext values
export const useUser = () => useContext(UserContext);

// Creating our theme provider. Accepts an argument of "props"
export default function UserProvider(props) {
  const initialState = {};

  return <Provider value={initialState} {...props} />;
}
