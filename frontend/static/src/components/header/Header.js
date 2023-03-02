import { NavLink } from "react-router-dom";

function Header() {
	return (
		<nav>
			<button>
				<NavLink to="/register">Register</NavLink>
			</button>
			<button>
				<NavLink to="/login">Login</NavLink>
			</button>
			<button>
				<NavLink to="/drafts">Drafts</NavLink>
			</button>
			<button>
				<NavLink to="/home">Home</NavLink>
			</button>
			<button>
				<NavLink to="/admin">Admin</NavLink>
			</button>
		</nav>
	);
}

export default Header;
