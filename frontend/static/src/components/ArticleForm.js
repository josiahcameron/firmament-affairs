import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ArticleForm() {
	const [article, setArticle] = useState({
		title: "",
		caption: "",
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

	const handleSubmit = async (event) => {
		console.log();
		event.preventDefault();
		const formData = new FormData();
		formData.append("title", article.title);
		formData.append("caption", article.caption);

		const options = {
			method: "POST",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: formData,
		};

		const response = await fetch("/api_v1/add-article/", options);
		const data = await response.json();
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
					id="caption"
					name="caption"
					value={article.caption}
					onChange={handleInput}
				/>
			</div>
			<button type="submit" className="btn btn-success">
				Submit
			</button>
		</form>
	);
}

export default ArticleForm;
