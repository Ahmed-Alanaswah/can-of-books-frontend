import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
class Authors extends Component {
	render() {
		return (
			<>
				<Carousel>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://image.winudf.com/v2/image/Y29tLmJsYWNrYmFja2dyb3VuZHdhbGxwYXBlcnNpbWFnZXNfc2NyZWVuXzFfMTUwOTI1MjEyOV8wNzU/screen-1.jpg?fakeurl=1&type=.jpg"
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>{this.props.author}</h3>
							<h3>{this.props.title}</h3>
							<h3>{this.props.email}</h3>
							<p>{this.props.description}</p>
							<p>{this.props.authorId}</p>
							<button
								onClick={() => this.props.handledelete(this.props.authorId)}
							>
								delete
							</button>
							<button
								onClick={() =>
									this.props.handleUpdate(
										this.props.author,

										this.props.title,

										this.props.description,

										this.props.email,
										this.props.authorId
									)
								}
							>
								update
							</button>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</>
		);
	}
}

export default Authors;
