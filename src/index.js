import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTHO_CLIENTID}
		clientId={process.env.REACT_APP_AUTHO_DOMAIN}
		redirectUri="/"
	>
		<App />
	</Auth0Provider>,
	document.getElementById("root")
);
