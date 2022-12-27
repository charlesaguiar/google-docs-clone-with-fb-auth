import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import App from "./App";
import AuthProvider from "./contexts/AuthContext";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";
import UiProvider from "./contexts/UiContext";

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
