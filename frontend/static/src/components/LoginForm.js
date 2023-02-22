import Cookies from "js-cookie";
import { useState } from "react";

const INITIAL_STATE = {
	username: "",
	email: "",
	password: "",
};

function LoginForm({ setAuth }) {
	const [state, setState] = useState(INITIAL_STATE);

	const handleError = (err) => {
		console.warn(err);
	};

	// Fat arrow functions maintain the outer value; 'this' is the LoginForm
	const handleInput = (e) => {
		// Value is the input at the event
		const { name, value } = e.target;

		// You can state the value you want to use for pre value of state or you can pass a callback function;
		// be default if you pass it a function, it will pass back the previous value of state - this is saying it would like to spread out the previous properties on state.
		// "Name" represents password or username - whichever the input is. 'value' is the value of the input
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
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
		const response = await fetch("/dj-rest-auth/login/", options).catch(
			handleError
		);
		if (!response.ok) {
			throw new Error("Network response was not OK");
		}

		// response will come back as an object with a key property value that's a token
		const data = await response.json();

		// value of cookie followed by a space and that key value; when logging in, you set the cookie
		Cookies.set("Authorization", `Token ${data.key}`);

		// Will set the authorization to true after they're logged in. Will then trigger a rerender that will switch over to ChannelList
		setAuth(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username</label>
			<input
				id="username"
				type="text"
				placeholder="Enter Username"
				name="username"
				value={state.username}
				onChange={handleInput}
			/>

			<label htmlFor="email">email</label>
			<input
				id="email"
				type="email"
				placeholder="Enter Email"
				name="email"
				value={state.email}
				onChange={handleInput}
			/>

			<label htmlFor="password">Password</label>
			<input
				id="password"
				type="password"
				placeholder="Enter Password"
				name="password"
				value={state.password}
				onChange={handleInput}
			/>

			<button type="submit">Login</button>
		</form>
	);
}

export default LoginForm;
