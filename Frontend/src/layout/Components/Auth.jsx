import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react"; 
import axios from "axios"; 

export const Auth = () => {
  const [roles, setRoles] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout, 
    getIdTokenClaims,
 
    getAccessTokenSilently 
  } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const claims = await getIdTokenClaims();
          const rolesClaim = claims?.["https://luv2code-react-library.com/roles"] || [];
          const userNameClaim = claims?.["https://luv2code-react-library.com/username"] || "";
          
          setRoles(rolesClaim);
          setUserName(userNameClaim);
          console.log(userNameClaim); 
        } else {
          setRoles(null);
          setUserName(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [isAuthenticated, getIdTokenClaims]);


  useEffect(() => {
    const registerUser = async () => {
      try {
       
        const accessToken = await getAccessTokenSilently(); 

        await axios.post(
          "http://localhost:8080/api/v1/auth0/register",
          {}, 
          {
            headers: {
             
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );

        console.log(" User registered successfully");
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    if (isAuthenticated) {
      registerUser();
    }
 
  }, [isAuthenticated, getAccessTokenSilently]); 

  if (loading) {
    return <p>loading...</p>;
  }

  const handleLogout = () => {
    console.log("handleLogout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
  
    loginWithRedirect(); 
  };

  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
        <button className="border-2 bg-red-800" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="border-2 bg-green-400" onClick={handleLogin}>
          Sign in
        </button>
      )}
    </div>
  );
};