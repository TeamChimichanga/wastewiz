import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import authFactory from "../data/auth-factory";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    _fetchUser();
  }, []);

  _fetchUser = async () => {
    const user = await get("user", true);
    setUser(user);
  };

  const login = (username) => {
    const user = authFactory.createNewUser(username);
    set("user", user);
    setUser(user, user);
  };

  const logout = () => {
    set("user", null);
    setUser(null);
  };

  const updateUserPoints = (points) => {
    const user = get("user", true);

    if (!user) {
      return;
    }

    const updatedUser = authFactory.updateUserPoints(user, points);

    set("user", updatedUser);
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
