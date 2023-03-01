import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Row";

function SubmittedDrafts({ article }) {
	return (
		<>
			<Col key={article.id} md={6}>
				<Card bg="dark" text="white" className="">
					<Card.Body>
						<Card.Title>{article.title}</Card.Title>
						<Card.Text>{article.text}</Card.Text>
					</Card.Body>
					<div className="button-container">
						<Button variant="primary" size="md">
							Deny Draft
						</Button>
						<Button variant="primary" size="md">
							Publish
						</Button>
					</div>
				</Card>
			</Col>
		</>
	);
}

export default SubmittedDrafts;
