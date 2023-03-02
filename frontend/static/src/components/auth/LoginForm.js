import Cookies from "js-cookie";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const INITIAL_STATE = {
	username: "",
	email: "",
	password: "",
};

function LoginForm() {
	const [state, setState] = useState(INITIAL_STATE);
	const [setAuth] = useOutletContext();
	const navigate = useNavigate();

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
		navigate("/");

		const responseTest = await fetch("/dj-rest-auth/user/").catch(
			handleError
		);
		const testData = await responseTest.json();
		// console.log(testData);
	};

	return (
		<>
			<div className="login-dark">
				<form>
					<h2 className="sr-only">Login Form</h2>
					{/* <div className="illustration">
				<i className="icon ion-ios-locked-outline">
					</i></div> */}
					<div className="form-group">
						<input
							id="username"
							type="text"
							placeholder="Enter Username"
							name="username"
							value={state.username}
							onChange={handleInput}
						/>
					</div>

					<div className="form-group">
						<input
							className="form-control"
							id="login-email"
							type="email"
							placeholder="Enter Email"
							name="email"
							value={state.email}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group"></div>

					<div className="form-group">
						<input
							className="form-control"
							id="password"
							type="password"
							placeholder="Enter Password"
							name="password"
							value={state.password}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<button
							onClick={handleSubmit}
							className="btn btn-primary btn-block"
						>
							Log In
						</button>
					</div>
					<a className="forgot" href="#">
						Forgot your email or password?
					</a>
				</form>
			</div>
		</>
	);
}

export default LoginForm;

// <form className="form form-login" onSubmit={handleSubmit}>
// 	{/* Fieldset tag is used to group elements of a form */}
// 	<fieldset>
// 		{/* The legend defines the caption/title for the fieldset tag and is its first element */}
// 		<legend>
// 			Please, enter your email and password for login.
// 		</legend>
// 		<div className="input-block">
// 			<label htmlFor="login-username">Username</label>
// 			<input
// 				id="username"
// 				type="text"
// 				placeholder="Enter Username"
// 				name="username"
// 				value={state.username}
// 				onChange={handleInput}
// 			/>
// 		</div>

// 		<div className="input-block">
// 			<label htmlFor="login-email">email</label>
// 			<input
// 				id="login-email"
// 				type="email"
// 				placeholder="Enter Email"
// 				name="email"
// 				value={state.email}
// 				onChange={handleInput}
// 			/>
// 		</div>

// 		<div className="input-block">
// 			<label htmlFor="login-password">Password</label>
// 			<input
// 				id="password"
// 				type="password"
// 				placeholder="Enter Password"
// 				name="password"
// 				value={state.password}
// 				onChange={handleInput}
// 			/>
// 		</div>
// 	</fieldset>
// 	<button type="submit" className="btn-login">
// 		Login
// 	</button>
// </form>
