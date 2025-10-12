import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { auth0Config } from './lib/auth0Config';

import { HomePage } from './layout/HomePage/HomePage';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { AfterAuth } from './layout/AfterAuth';

import { useNavigate } from 'react-router-dom';
const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // const onRedirectCallback = (appState: any) => {
  //   navigate(appState?.returnTo || "/home");
  // };
  const onRedirectCallback = (appState: { returnTo?: string } | undefined) => {
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


const SecureAfterAuth = withAuthenticationRequired(AfterAuth);

export const App = () => {
  return (
    <Auth0ProviderWithNavigate>
      <div className='d-flex flex-column min-vh-100'>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
           
            <Route path='/' element={<Navigate to='/home' />} />

           
            <Route path='/home' element={<HomePage />} />

          
            <Route path='/AfterAuth' element={<SecureAfterAuth />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Auth0ProviderWithNavigate>
  );
};
