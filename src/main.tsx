import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthProvider from "contexts/AuthContext";
import UiProvider from "contexts/UiContext";

import App from "./App";

import "index.css";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<UiProvider>
						<App />
					</UiProvider>
				</QueryClientProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>
);
