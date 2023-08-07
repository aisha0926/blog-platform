// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchUserMeData } from "../components/Header/fetchUserMeData";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );
  const [userData, setUserData] = useState(null); // To store user data
  const [loading, setLoading] = useState(true); // To indicate if data is being fetched

  useEffect(() => {
    if (authToken) {
      // Simulating user data from the backend (replace this with your actual API call)
      setTimeout(() => {
        const fetchUserData = async () => {
          const userData = await fetchUserMeData(authToken);
          if (userData) {
            setUserData(userData);
            setLoading(false); // Data is fetched, set loading to false
          }
        };
        fetchUserData();
      }, 1000);
    } else {
      setLoading(false); // No authToken, set loading to false
    }
  }, [authToken]);

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    setUserData(null); // Clear the user data on logout
    window.location.reload();
  };

  // Wait until userData is fetched and not null before rendering children
  if (loading) {
    // Display a loading spinner or other loading indication
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ authToken, logout, userData, setAuthToken, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
