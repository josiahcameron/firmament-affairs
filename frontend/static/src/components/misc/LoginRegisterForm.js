import Cookies from "js-cookie";
import { useState } from "react";

const INITIAL_STATE = {
	username: "",
	email: "",
	password: "",
};

function LoginRegisterForm({ setAuth }) {
	const switchers = [...document.querySelectorAll(".switcher")];
	const switchForm = () => {
		switchers.forEach((item) => {
			item.addEventListener("click", function () {
				console.log("");
				switchers.forEach((item) =>
					item.parentElement.classList.remove("is-active")
				);
				this.parentElement.classList.add("is-active");
			});
		});
	};

	// switchers.forEach((item) => {
	// 	item.addEventListener("click", function () {
	// 		console.log("");
	// 		switchers.forEach((item) =>
	// 			item.parentElement.classList.remove("is-active")
	// 		);
	// 		this.parentElement.classList.add("is-active");
	// 	});
	// });

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
		<section className="forms-section">
			<h1 className="section-title">Login/Register</h1>
			<div className="forms">
				<div className=" login form-wrapper is-active">
					<button
						type="button"
						className="switcher switcher-login"
						onClick={switchForm}
					>
						Login
						<span className="underline"></span>
					</button>
					<form className="form form-login" onSubmit={handleSubmit}>
						{/* Fieldset tag is used to group elements of a form */}
						<fieldset>
							{/* The legend defines the caption/title for the fieldset tag and is its first element */}
							<legend>
								Please, enter your email and password for login.
							</legend>
							<div className="input-block">
								<label htmlFor="login-username">Username</label>
								<input
									id="username"
									type="text"
									placeholder="Enter Username"
									name="username"
									value={state.username}
									onChange={handleInput}
								/>
							</div>

							<div className="input-block">
								<label htmlFor="login-email">email</label>
								<input
									id="login-email"
									type="email"
									placeholder="Enter Email"
									name="email"
									value={state.email}
									onChange={handleInput}
								/>
							</div>

							<div className="input-block">
								<label htmlFor="login-password">Password</label>
								<input
									id="password"
									type="password"
									placeholder="Enter Password"
									name="password"
									value={state.password}
									onChange={handleInput}
								/>
							</div>
						</fieldset>
						<button type="submit" className="btn-login">
							Login
						</button>
					</form>
				</div>

				<div className="register form-wrapper">
					<button
						type="button"
						className="switcher switcher-signup"
						onClick={switchForm}
					>
						Sign Up
						<span className="underline"></span>
					</button>
					<form className="form form-signup">
						<fieldset>
							<legend>
								Please, enter your email, password and password
								confirmation for sign up.
							</legend>
							<div className="input-block">
								<label htmlFor="signup-email">E-mail</label>
								<input
									id="signup-email"
									type="email"
									required
								/>
							</div>
							<div className="input-block">
								<label htmlFor="signup-password">
									Password
								</label>
								<input
									id="signup-password"
									type="password"
									required
								/>
							</div>
							<div className="input-block">
								<label htmlFor="signup-password-confirm">
									Confirm password
								</label>
								<input
									id="signup-password-confirm"
									type="password"
									required
								/>
							</div>
						</fieldset>
						<button type="submit" className="btn-signup">
							Continue
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}

export default LoginRegisterForm;
