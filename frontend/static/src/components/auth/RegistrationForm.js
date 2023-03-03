import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INITIAL_STATE = {
	username: "",
	email: "",
	password1: "",
	password2: "",
};

function RegistrationForm() {
	const [state, setState] = useState(INITIAL_STATE);
	const navigate = useNavigate();

	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (e) => {
		const { name, value } = e.target;

		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const addUser = async (event) => {
		event.preventDefault();
		const options = {
			// http method; typ of request
			method: "POST",
			//
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			// data we're sending
			body: JSON.stringify(state),
		};
		const response = await fetch(
			"/dj-rest-auth/registration/",
			options
		).catch(handleError);
		if (!response.ok) {
			throw new Error("Network response not Ok");
		}
		navigate("/home");
	};

	return (
		<div className="registration container">
			<Form className="registration-form" onSubmit={addUser}>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						id="username"
						type="username"
						placeholder="Enter username"
						name="username"
						value={state.username}
						onChange={handleInput}
						autoComplete="off"
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						id="email"
						type="email"
						placeholder="Enter email"
						name="email"
						value={state.email}
						onChange={handleInput}
						autoComplete="off"
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						id="password1"
						type="password"
						placeholder="Enter password"
						name="password1"
						value={state.password1}
						onChange={handleInput}
						autoComplete="off"
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						id="password2"
						type="password"
						placeholder="Enter passwordtwo"
						name="password2"
						value={state.password2}
						onChange={handleInput}
						autoComplete="off"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default RegistrationForm;

// function RegistrationForm() {

//   // If the fetch request is still processing, it will load this spinner
//   if (!channels){
//     return <div>Fetching Data ...</div>
//   }
//   const channelsHTML = channels.map(channel => (
//     <li key={channels.id}>{channel.name}</li>
//   ))

//   return (
//     <div className="ChannelList">
//       {channelsHTML}
//     <button type="button" onClick={addChannels}>Add Channel</button>
//     </div>
//   );
// }

// export default ChannelList;
