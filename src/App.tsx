import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { useAuthContext } from "./contexts/AuthContext";

import Signup from "./pages/Public/Signup";
import Login from "./pages/Public/Login";
import ForgotPassword from "./pages/Public/ForgotPassword";

import Dashboard from "./pages/Private/Dashboard";
import UpdateProfile from "./pages/Private/UpdateProfile";

import PublicRoutesLayout from "./layouts/PublicRoutesLayout";
import PrivateRoutesLayout from "./layouts/PrivateRoutesLayout";
import MyDocuments from "./pages/Private/MyDocuments";
import SharedWithMe from "./pages/Private/SharedWithMe";
import Peers from "./pages/Private/Peers";

function App() {
	const { isAuthenticated, loading } = useAuthContext();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<ClipLoader size={50} />
			</div>
		);
	}

	return (
		<>
			<Routes>
				{isAuthenticated ? (
					<>
						<Route path="" element={<PrivateRoutesLayout />}>
							<Route path="" element={<Dashboard />} />
							<Route path="my-documents" element={<MyDocuments />} />
							<Route path="shared-with-me" element={<SharedWithMe />} />
							<Route path="peers" element={<Peers />} />
							<Route path="update-profile" element={<UpdateProfile />} />
						</Route>
						<Route path="*" element={<Navigate to="home" />} />
					</>
				) : (
					<>
						<Route path="pb" element={<PublicRoutesLayout />}>
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<Signup />} />
							<Route path="forgot-password" element={<ForgotPassword />} />
						</Route>
						<Route path="*" element={<Navigate to="pb/login" />} />
					</>
				)}
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
