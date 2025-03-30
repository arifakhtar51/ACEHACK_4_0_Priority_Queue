import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain='dev-l0b8pzxczwiggqc8.uk.auth0.com'
  clientId='XwKWWoxub8bqvEP0xnAAVQBdPgwFaUkE'
  authorizationParams={{ redirect_uri: window.location.origin }}>
  <App />
</Auth0Provider>
);