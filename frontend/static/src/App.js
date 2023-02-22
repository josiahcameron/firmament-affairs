import { useState } from "react";
import Cookies from "js-cookie";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

import "./App.css";

function App() {
	const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));

	return <>{<HomePage />}</>;
}

export default App;
// LoginForm setAuth={setAuth}
// <header className="main-header">
// 	<button className="logout" onClick={logout}></button>
// </header>;
