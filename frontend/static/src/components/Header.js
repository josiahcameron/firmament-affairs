import { NavLink } from "react-router-dom";

function Header() {
	return (
		<nav>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/register">Register</NavLink>
			<NavLink to="/drafts">Drafts</NavLink>
		</nav>
	);
}

export default Header;
