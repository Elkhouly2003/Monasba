import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Search from "./Components/SearchPage/SearchPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/search", element: <Search /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
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
