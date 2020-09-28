import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GithubProvider } from "./context/context";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="devsandy.us.auth0.com"
    clientId="6J57NPiGUiknGo4j8esGFsjlfPYjBuDh"
    redirectUri={window.location.origin}
  >
    <GithubProvider>
      <App />
    </GithubProvider>
  </Auth0Provider>,
  document.querySelector("#root")
);
