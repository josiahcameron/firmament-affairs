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
		<Col key={article.id} className="container">
			<div className="post-container">
				<Card className="bg-dark text-white single-post">
					<Card.Img src={article.image} alt="post-image" />
					<Card.ImgOverlay>
						<a className="article-category">{article.category}</a>
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
		<div className="container">
			<header id="header" className="header">
				<div className="header-wrapper">
					<Navbar className="navbar" sticky="top" expand="lg">
						<Container>
							<Navbar.Brand href="#home">Categories</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<ul className="navbar-nav text-upper">
										<li>
											<Nav.Link
												href="#home"
												onClick={() => setFilter("")}
											>
												All
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												href="#home"
												onClick={() =>
													setFilter(
														"inter-dimensional"
													)
												}
											>
												Inter-Dimensional
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												href="#qotd"
												onClick={() =>
													setFilter("qotd")
												}
											>
												Quotes of the Day
											</Nav.Link>
										</li>
										<li>
											<Nav.Link
												href="#home"
												onClick={() =>
													setFilter(
														"quasi-dimensional"
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
			<Container className="content-container">
				<Row>{articlesHTML} </Row>
			</Container>
		</div>
	);
}

export default HomePage;
