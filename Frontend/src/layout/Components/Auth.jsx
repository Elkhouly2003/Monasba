import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Auth = () => {
  const [roles, setRoles] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to handle async data
  const { isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } =
    useAuth0();

  useEffect(() => {
    const fetchRoles = async () => {
      const claims = await getIdTokenClaims();
      const fetchedRoles =
        claims?.["https://luv2code-react-library.com/roles"] || [];
      setRoles(fetchedRoles);
      setLoading(false); // Set loading to false once roles are loaded
    };
    const fetchUserName = async () => {
      const claims = await getIdTokenClaims();
      const fetchedUserName =
        claims?.["https://luv2code-react-library.com/username"] || [];
      setUserName(fetchedUserName);
      console.log(fetchedUserName);

      setLoading(false); // Set loading to false once roles are loaded
    };

    fetchUserName();
    fetchRoles();
  }, [isAuthenticated, getIdTokenClaims]);

  if (loading) {
    return <p>loading...</p>;
  }

  const handleLogout = () => {
    console.log("handleLogout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
    // sign in page
    loginWithRedirect();
    window.location.assign("/");
  };

  console.log("isAuthenticated: ", isAuthenticated);

  return (
    // <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
    //   <div className="container-fluid">
    //     <span className="navbar-brand">Luv 2 Read</span>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNavDropdown"
    //       aria-controls="navbarNavDropdown"
    //       aria-expanded="false"
    //       aria-label="Toggle Navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/home">
    //             Home
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/search">
    //             Search Books
    //           </NavLink>
    //         </li>
    //         {isAuthenticated && (
    //           <li className="nav-item">
    //             <NavLink className="nav-link" to="/AfterAuth">
    //               AfterAuth
    //             </NavLink>
    //           </li>
    //         )}
    //         {isAuthenticated && roles?.includes("admin") && (
    //           <li className="nav-item">
    //             <NavLink className="nav-link" to="/admin">
    //               Admin
    //             </NavLink>
    //           </li>
    //         )}
    //       </ul>
    //       <ul className="navbar-nav ms-auto">
    //         {!isAuthenticated ? (
    //           <li className="nav-item m-1">
    //             <button className="btn btn-outline-light" onClick={handleLogin}>
    //               Sign in
    //             </button>
    //           </li>
    //         ) : (
    //           <li>
    //             <button
    //               className="btn btn-outline-light"
    //               onClick={handleLogout}
    //             >
    //               Logout
    //             </button>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

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
