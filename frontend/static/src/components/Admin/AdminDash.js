import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SubmittedDrafts from "./SubmittedDrafts";
import Cookies from "js-cookie";

function AdminDash() {
	const [articles, setArticles] = useState(null);
	const [filter, setFilter] = useState(null);

	useEffect(() => {
		const getArticles = async () => {
			let url = `/api_v1/admin/`;

			if (filter) {
				url += `?phase=${filter}`;
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

	// Variable is a clone of the updated articles array to be sent to the api
	const updateArticle = (updatedArticle) => {
		const updatedArticles = [...articles];

		// Will find the article instances
		const index = articles.findIndex(
			(article) => article.id === updatedArticle.id
		);
		// Sets the new article array to the value of the updated one
		updatedArticles[index] = updatedArticle;
		// Sets article array to the new updated values
		setArticles(updatedArticles);
	};

	const handleDelete = async (article) => {
		const options = {
			method: "DELETE",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		const response = await fetch(`api_v1/destroy/${article}`, options);
		if (!response.ok) {
			throw new Error("Network response not Ok");
		}
	};

	// Iterates through articles array and runs it through the component
	const articlesHTML = articles.map((article) => (
		<SubmittedDrafts
			key={article.id}
			article={article}
			handleDelete={handleDelete}
			updateArticle={updateArticle}
		/>
	));

	return (
		<>
			<div className="admin-wrapper">
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="#articles">Article</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link
									onClick={() => setFilter("")}
									href="#all-articles"
								>
									All
								</Nav.Link>
								<Nav.Link
									onClick={() => setFilter("submitted")}
									href="#article-drafts"
								>
									Drafts
								</Nav.Link>
								<Nav.Link
									onClick={() => setFilter("published")}
									href="#published-articles"
								>
									Published
								</Nav.Link>
								<Nav.Link
									onClick={() => setFilter("archived")}
									href="#article-archive"
								>
									Archive
								</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link href="#deets">More deets</Nav.Link>
								<Nav.Link eventKey={2} href="#memes">
									Dank memes
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<div className="admin articles">{articlesHTML}</div>
			</div>
		</>
	);
}

export default AdminDash;
