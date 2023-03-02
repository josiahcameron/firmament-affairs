import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ArticleForm({ articles, setArticles }) {
	const [article, setArticle] = useState({
		title: "",
		text: "",
		category: "",
		is_submitted: false,
	});

	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (event) => {
		const { name, value } = event.target;
		setArticle({
			...article,
			[name]: value,
		});
	};

	const handleSelect = (event) => {
		const { name, value } = event.target;
		setArticle({
			...article,
			[name]: value,
		});
		console.log(article);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setArticle({
			...article,
			is_submitted: true,
		});
		const formData = new FormData();
		formData.append("title", article.title);
		formData.append("text", article.text);
		formData.append("category", article.category);
		formData.append("is_submitted", article.is_submitted);

		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: formData,
		};

		const response = await fetch("/api_v1/add-article/", options);
		const data = await response.json();
		setArticles([...articles, data]);
		console.log(formData);
		console.log({ data });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="title" className="form-label">
					Title
				</label>
				<input
					type="text"
					className="form-control"
					id="title"
					name="title"
					value={article.title}
					onChange={handleInput}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="caption" className="form-label">
					Caption
				</label>
				<input
					type="text"
					className="form-control"
					id="text"
					name="text"
					value={article.text}
					onChange={handleInput}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="category">Select Category</label>
				<select
					className="form-control mb-3"
					id="category"
					name="category"
					onChange={handleSelect}
				>
					<option value={"MC"}>Microcosm</option>
					<option value={"QOTD"}>Quote of the Day</option>
					<option value={"I_D"}>Inter-dimensional</option>
					<option value={"Q_D"}>Quasi-dimensional</option>
				</select>
			</div>
			<button type="submit" className="btn btn-success">
				Submit
			</button>
		</form>
	);
}

export default ArticleForm;
