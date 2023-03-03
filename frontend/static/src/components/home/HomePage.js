import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomePage() {
	const [articles, setArticles] = useState(null);
	const [filter, setFilter] = useState(null);

	useEffect(() => {
		const getArticles = async () => {
			let url = `/api_v1/home/`;

			if (filter) {
				url += `?category=${filter}`;
			}
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Network response was not OK");
			}

			const data = await response.json();
			setArticles(data);
		};

		getArticles();
	}, [filter]);

	if (!articles) {
		return <div>Fetching Articles...</div>;
	}

	const articlesHTML = articles.map((article) => (
		<Col key={article.id}>
			<div className="post-container">
				<Card className="bg-dark text-white single-post h-100 w-80 mt-5">
					{/* <Card.Img src={article.image} alt="post-image" /> */}
					<Card.ImgOverlay>
						<h4 className="article-category">{article.category}</h4>
						<Card.Title>{article.title}</Card.Title>
						<Card.Text>{article.text}</Card.Text>
						<div className="post-info flexbox">
							<Card.Text>{article.date_created}</Card.Text>
						</div>
					</Card.ImgOverlay>
				</Card>
			</div>
		</Col>
	));

	return (
		<div className="wrapper">
			<header id="header" className="header">
				<div className="header-wrapper">
					<Navbar
						bg="dark"
						variant="dark"
						className="navbar"
						sticky="top"
						expand="lg"
					>
						<Container>
							<Navbar.Brand>Categories</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<ul className="navbar-nav text-upper category-options">
										<li>
											<Nav.Link
												className="category-link"
												href="#home"
												onClick={() => setFilter("")}
											>
												All
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												className="category-link"
												href="#home"
												onClick={() =>
													setFilter("Microcosm")
												}
											>
												Microcosm
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												className="category-link"
												href="#home"
												onClick={() =>
													setFilter(
														"Inter-dimensional"
													)
												}
											>
												Inter-Dimensional
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												className="category-link"
												href="#qotd"
												onClick={() =>
													setFilter(
														"Quote of the Day"
													)
												}
											>
												Quotes of the Day
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												className="category-link"
												href="#home"
												onClick={() =>
													setFilter(
														"Quasi-dimensional"
													)
												}
											>
												Quasi-Dimensional
											</Nav.Link>
										</li>
									</ul>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
			</header>
			<div className="article-container">
				<Col>{articlesHTML} </Col>
			</div>
		</div>
	);
}

export default HomePage;
