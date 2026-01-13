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
import EmailVerify from "./AuthenticationPage/EmailVerify.jsx";
import Provider from "./Components/Provider/Provider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileAdmin from "./Components/ProfileAdmin/ProfileAdmin.jsx";
import Guard from "./Components/Guard/Guard.jsx";
import AuGuard from "./Components/AuGuard/AuGuard.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    { path: "/login", element:<AuGuard><Login /></AuGuard> },
    { path: "/reset-password", element:<AuGuard><ResetPassword /></AuGuard> },
    { path: "/email-verify", element:<AuGuard><EmailVerify /></AuGuard> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element:<Home /> },
        { path: "/search", element: <Search /> },
        { path: "place/:id", element:<Guard><SingleEventPage /></Guard> },
        { path: "/profile", element: <Profile /> },
        { path: "/provider", element: <Provider /> },
        { path: "/admin", element: <ProfileAdmin /> },
        { path: "*", element: <NotFound /> },

      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
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
