import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import authFactory from "../data/auth-factory";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

const USER_KEY = "wizard_w";

const AuthContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    _fetchUser();
  }, []);

  _fetchUser = async () => {
    const user = await get(USER_KEY, true);
    setUser(user);
  };

  const login = (username) => {
    const user = authFactory.createNewUser(username);
    set(USER_KEY, user);
    setUser(user, user);
  };

  const logout = () => {
    set(USER_KEY, null);
    setUser(null);
  };

  const updateUserPoints = (points) => {
    if (!user) {
      return;
    }

    console.log({ user });

    const updatedUser = authFactory.addPoints(user, points);

    console.log({ updatedUser });

    set(USER_KEY, updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn: !!user,
        login,
        logout,
        updateUserPoints,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
