import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import LoginRegisterForm from "./components/LoginRegisterForm";
import ArticleDrafts from "./components/ArticleDrafts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				{/*  */}
				<Route path="/" element={<App />}>
					{/* Nesting router */}
					<Route path="login" element={<LoginForm />} />
					<Route path="register" element={<RegistrationForm />} />
					<Route path="drafts" element={<ArticleDrafts />} />
				</Route>
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
