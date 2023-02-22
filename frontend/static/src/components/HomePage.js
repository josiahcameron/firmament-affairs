import { useState } from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const INITIAL_ARTICLES = [
	{
		title: "",
		author: "",
		text: "",
		image: "",
		category: "",
		new: false,
	},
];

function HomePage() {
	const [article, setArticle] = useState({
		title: "",
		text: "",
		image: null,
	});

	return (
		<div className="container">
			<header id="header" className="header">
				<div className="header-wrapper">
					<Navbar className="navbar" sticky="top" expand="lg">
						<Container>
							<Navbar.Brand href="#home">Categories</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<ul
										className="navbar-nav text-upper"
										role="list"
									>
										<li>
											<Nav.Link href="#home">
												Home
											</Nav.Link>
										</li>
										<li>
											<Nav.Link href="#home">
												Home
											</Nav.Link>
										</li>
										<li>
											<Nav.Link href="#home">
												Home
											</Nav.Link>
										</li>
									</ul>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
			</header>
			<div className="content-container">
				<article className="single-post">
					<div className="post-container">
						<a href="#">
							<img src="" alt="" />
						</a>
						<div className="post-content">
							<a className="genre"></a>
							<h3 className="post-title"></h3>
							<ul className="post-info">
								<li className="author"></li>
								<li className="date-created"></li>
							</ul>
						</div>
					</div>
				</article>
			</div>
		</div>
	);
}

export default HomePage;
