import { useState, useEffect } from "react";

import Cookies from "js-cookie";

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
		updatedArticle.phase = "submitted";
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
							<p>Author: {article.author_username}</p>
							<p>Category: {article.category}</p>
							{article.phase == "draft" && (
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

export default Article;
