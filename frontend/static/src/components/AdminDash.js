import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SubmittedDrafts from "./Admin/SubmittedDrafts";
import Cookies from "js-cookie";

function AdminDash() {
	const [articles, setArticles] = useState(null);

	useEffect(() => {
		const getArticles = async () => {
			let url = `/api_v1/drafts/`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Network response was not OK");
			}

			const data = await response.json();

			setArticles(data);
		};

		getArticles();
	}, []);

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
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							Signed in as: <a href="#login">Mark Otto</a>
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className="admin articles">{articlesHTML}</div>
		</>
	);
}

export default AdminDash;
