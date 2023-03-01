import { useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import ArticleForm from "./ArticleForm";
import Cookies from "js-cookie";
import EditArticle from "./EditArticle";

function Article({ article, handleDelete, updateArticle }) {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState(article.text);

	const saveEdit = async (e) => {
		const updatedArticle = { ...article };
		updatedArticle.text = text;

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(updatedArticle),
		};
		const response = await fetch(`/api_v1/update/${article.id}/`, options);
		if (!response.ok) {
			throw new Error("Network response not Ok");
		}

		setEditMode(false);
		const data = await response.json();
		updateArticle(data);
	};

	const handleSubmit = async (e) => {
		const updatedArticle = { ...article };
		updatedArticle.is_submitted = true;
		delete updatedArticle.id;

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(updatedArticle),
		};
		const response = await fetch(`/api_v1/update/${article.id}/`, options);
		if (!response.ok) {
			throw new Error("Network response not Ok");
		}

		const data = await response.json();
		updateArticle(data);
	};

	return (
		<div key={article.id} className="container">
			<div className="row">
				<div className="col-md-8">
					<ul className="list-group">
						<li className="list-group-item">
							<h4>Title: {article.title}</h4>
							<textarea
								type="text"
								className={`${!editMode && "input-preview"}`}
								disabled={!editMode}
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
							<p>Date Created: {article.created_at}</p>
							<p>Author: {article.author}</p>
							<p>Category: {article.category}</p>
							{!article.is_submitted && (
								<div className="draft-options">
									{editMode ? (
										<button
											type="button"
											className="btn btn-primary save-button"
											onClick={(e) => saveEdit()}
										>
											Save
										</button>
									) : (
										<button
											type="button"
											className="btn btn-primary edit-button"
											onClick={() => setEditMode(true)}
										>
											Edit
										</button>
									)}

									<button
										type="button"
										className="btn btn-danger delete-button"
										onClick={() => handleDelete(article.id)}
									>
										Delete
									</button>
									<button
										type="button"
										className="btn btn-success submit-button"
										onClick={handleSubmit}
									>
										Submit
									</button>
								</div>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

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
