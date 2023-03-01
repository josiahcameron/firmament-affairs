import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
function EditArticle({ articleId }) {
	const [article, setArticle] = useState(articleId);

	useEffect(() => {
		const getArticle = async () => {
			let url = `/api_v1/update/${article}`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Network response was not OK");
			}

			const data = await response.json();

			setArticle(data);
		};

		getArticle();
	}, []);

	if (!article) {
		return <div>Fetching Articles...</div>;
	}

	const articleHTML = article.map((article) => (
		<Form>
			<Form.Group className="mb-3" controlId="text">
				<Form.Label>Title</Form.Label>
				<Form.Control type="title" placeholder="Enter title" />
				<Form.Text>{article.title}</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="text">
				<Form.Label>{article.text}</Form.Label>
				<Form.Control type="text" placeholder="Enter text" />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	));

	return { articleHTML };
}

export default EditArticle;
