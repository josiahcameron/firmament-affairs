import { NavLink } from "react-router-dom";

function Header({ handleLogout }) {
	return (
		<>
			<h1 className="title">Firmament Affairs</h1>
			<nav className="top-nav">
				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="/register">
						Register
					</NavLink>
				</button>
				<button type="button" className="btn btn-primary top-button ">
					<NavLink className="nav-text" to="/login">
						Login
					</NavLink>
				</button>
				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="/drafts">
						Drafts
					</NavLink>
				</button>
				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="/home">
						Home
					</NavLink>
				</button>
				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="/admin">
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
		</>
	);
}

export default Header;
