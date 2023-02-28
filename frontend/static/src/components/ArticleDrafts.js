import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ArticleForm from "./ArticleForm";
import Cookies from "js-cookie";

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

	const articlesHTML = articles
		// .filter((article) =>
		// 	filter ? article.category.toLowerCase() === filter : article
		// )
		// .
		.map((article) => (
			<div key={article.id} className="container">
				<div className="row">
					<div className="col-md-8">
						<ul className="list-group">
							<li className="list-group-item">
								<h4>Title: {article.title}</h4>
								<p>Text: {article.text}</p>
								<p>Date Created: {article.created_at}</p>
								<p> Author: {article.author}</p>
								<p>Category: {article.category}</p>
								<div className="draft-options">
									<button
										type="button"
										className="btn btn-primary edit-button"
									>
										Edit
									</button>
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
									>
										Submit
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
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
