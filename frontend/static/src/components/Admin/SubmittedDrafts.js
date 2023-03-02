import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

function SubmittedDrafts({ article, updateArticle }) {
	const publishDraft = async (e) => {
		const updatedArticle = { ...article };
		updatedArticle.phase = "published";

		if (updatedArticle.image !== File) {
			delete updatedArticle.image;
		}

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

	const archiveArticle = async (e) => {
		const updatedArticle = { ...article };
		updatedArticle.phase = "archived";

		if (updatedArticle.image != File) {
			delete updatedArticle.image;
		}

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

	const denyDraft = async (e) => {
		const updatedArticle = { ...article };
		updatedArticle.phase = "draft";

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

	let adminButtonHTML;
	if (article.phase === "draft") {
		adminButtonHTML = (
			<>
				<Button onClick={denyDraft} variant="danger" size="md">
					Deny Draft
				</Button>
				<Button
					onClick={publishDraft}
					variant="success"
					size="md"
					className="publish-button"
				>
					Publish Draft
				</Button>
			</>
		);
	} else if (article.phase === "published") {
		adminButtonHTML = (
			<>
				<Button
					onClick={archiveArticle}
					variant="warning"
					size="md"
					className="archive-button"
				>
					Archive Article
				</Button>
			</>
		);
	} else if (article.phase === "archived") {
		adminButtonHTML = (
			<>
				<Button
					onClick={publishDraft}
					variant="success"
					size="md"
					className="publish-button"
				>
					Publish Article
				</Button>
			</>
		);
	}

	return (
		<>
			<Col key={article.id} md={6}>
				<Card bg="dark" text="white" className="">
					<Card.Body>
						<Card.Title>{article.title}</Card.Title>
						<Card.Text>{article.text}</Card.Text>
						<Card.Text>{article.author_username}</Card.Text>
					</Card.Body>
					<div className="button-container">{adminButtonHTML}</div>
				</Card>
			</Col>
		</>
	);
}

export default SubmittedDrafts;
