import { useState } from "react";
import Cookies from "js-cookie";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import LoginRegisterForm from "./components/LoginRegisterForm";
import ArticleDrafts from "./components/ArticleDrafts";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";

const INITIAL_STATE = {
	username: "",
	email: "",
	password: "",
};

function App() {
	const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
	const [state, setState] = useState(INITIAL_STATE);

	const navigate = useNavigate();

	const handleError = (err) => {
		console.warn(err);
	};

	const handleLogout = async (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			// It can be state since it's an object
			body: JSON.stringify(state),
		};
		// .catch wil trigger as an error
		const response = await fetch("/dj-rest-auth/logout/", options).catch(
			handleError
		);
		if (!response.ok) {
			throw new Error("Network response was not OK");
		}

		// response will come back as an object with a key property value that's a token
		const data = await response.json();

		// value of cookie followed by a space and that key value; when logging in, you set the cookie
		Cookies.remove("Authorization", `Token ${data.key}`);

		// Will set the authorization to true after they're logged in. Will then trigger a rerender that will switch over to ChannelList
		setAuth(false);
		navigate("login");
	};

	return (
		<>
			<header>
				<Header isAuth={isAuth} />
				<button
					onClick={handleLogout}
					type="button"
					className="btn btn-danger logout"
				>
					Logout
				</button>
			</header>
			<Outlet context={[setAuth]} />
		</>
	);
}

export default App;
