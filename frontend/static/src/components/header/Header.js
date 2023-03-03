import { NavLink } from "react-router-dom";

function Header({ handleLogout }) {
	return (
		<nav class="top-nav">
			<button type="button" class="btn btn-primary top-button">
				<NavLink class="nav-text" to="/register">
					Register
				</NavLink>
			</button>
			<button type="button" class="btn btn-primary top-button">
				<NavLink class="nav-text" to="/login">
					Login
				</NavLink>
			</button>
			<button type="button" class="btn btn-primary top-button">
				<NavLink class="nav-text" to="/drafts">
					Drafts
				</NavLink>
			</button>
			<button type="button" class="btn btn-primary top-button">
				<NavLink class="nav-text" to="/home">
					Home
				</NavLink>
			</button>
			<button type="button" class="btn btn-primary top-button">
				<NavLink class="nav-text" to="/admin">
					Admin
				</NavLink>
			</button>
			<button
				onClick={handleLogout}
				type="button"
				className="btn btn-danger logout"
			>
				Logout
			</button>
		</nav>
	);
}

export default Header;
