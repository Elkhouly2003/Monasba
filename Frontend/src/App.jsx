import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Search from "./Components/SearchPage/SearchPage";
import SingleEventPage from "./Components/SinglePage/SingleEventPage";
import { ToastContainer } from "react-toastify";
import Login from "./AuthenticationPage/Login.jsx";
import ResetPassword from "./AuthenticationPage/ResetPassword.jsx";
import Profile from "./Components/Profile/profile.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/reset-password", element: <ResetPassword /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/search", element: <Search /> },
        { path: "place/:id", element: <SingleEventPage /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;

/* import { Routes, Route } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { auth0Config } from "./lib/auth0Config";
import { useNavigate } from "react-router-dom";

import HomePage from "./Components/Home/HomePage";
import SearchPage from "./Components/Search/SearchPage";

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  // const onRedirectCallback = (appState: any) => {
  //   navigate(appState?.returnTo || "/home");
  // };
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/home");
  };

  return (
    <Auth0Provider
      domain={auth0Config.issuer}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        scope: auth0Config.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export const App = () => {
  return (
    <Auth0ProviderWithNavigate>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Search" element={<SearchPage />} />
      </Routes>
    </Auth0ProviderWithNavigate>
  );
};
 */
