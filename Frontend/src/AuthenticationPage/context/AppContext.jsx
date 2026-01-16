import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constans";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../store/useUser";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { setUser } = useUser();
  axios.defaults.withCredentials = true;
  const backendUrl = AppConstants.BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/profile");
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error("Unable to retrieve user profile");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const response = await axios.get(backendUrl + "/is-authenticated");
      if (response.status === 200 && response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(backendUrl + "/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(null);
        setUser(null);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
