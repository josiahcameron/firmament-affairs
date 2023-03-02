import { useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import Cookies from "js-cookie";

import ArticleForm from "./ArticleForm";
import Article from "./Article";

function ArticleDrafts() {
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

	const updateArticle = (updatedArticle) => {
		const updatedArticles = [...articles];
		const index = articles.findIndex(
			(article) => article.id === updatedArticle.id
		);
		updatedArticles[index] = updatedArticle;
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

	const articlesHTML = articles.map((article) => (
		<Article
			key={article.id}
			article={article}
			handleDelete={handleDelete}
			updateArticle={updateArticle}
		/>
	));

	return (
		<>
			<div className="article-form">
				{<ArticleForm articles={articles} setArticles={setArticles} />}
			</div>
			<main className="articles">{articlesHTML}</main>
		</>
	);
}

export default ArticleDrafts;

// let editArticleHTML = [];

// const handleEdit = (article) => {
// 	console.log(editMode);
// 	editArticleHTML = (
// 		<Form>
// 			<Form.Group className="mb-3" controlId="text">
// 				<Form.Label>Title</Form.Label>
// 				<Form.Control type="title" placeholder="Enter title" />
// 				<Form.Text>{article.title}</Form.Text>
// 			</Form.Group>

// 			<Form.Group className="mb-3" controlId="text">
// 				<Form.Label>{article.text}</Form.Label>
// 				<Form.Control type="text" placeholder="Enter text" />
// 			</Form.Group>

// 			<Button
// 				onSubmit={setEditMode(false)}
// 				variant="primary"
// 				type="submit"
// 			>
// 				Submit
// 			</Button>
// 		</Form>
// 	);
// };
