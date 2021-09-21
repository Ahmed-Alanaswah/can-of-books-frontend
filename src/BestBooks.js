import React from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
class BestBooks extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		books: [],
	// 	};
	// }

	/* TODO: Make a GET request to your API to fetch books for the logged in user  */
	// componentDidMount = async () => {
	// 	axios.get(`http://localhost:3000/get-data`).then((res) => {
	// 		this.setState({
	// 			books: res,
	// 		});
	// 		console.log(this.state.books);
	// 	});

	// 	console.log("ahmed");
	// };
	render() {
		/* TODO: render user's books in a Carousel */

		return (
			<>
				<h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
				{/* 
				{this.state.books.length ? (
					this.state.books.map((post) => {
						return (
							<>
								<h2> Authir: {this.name}</h2>
								<h2> Authir: {post.name}</h2>
								<Carousel fade>
									{post.books.map((book) => {
										return (
											<Carousel.Item>
												<img
													className="d-block w-100"
													src="https://image.winudf.com/v2/image/Y29tLmJsYWNrYmFja2dyb3VuZHdhbGxwYXBlcnNpbWFnZXNfc2NyZWVuXzFfMTUwOTI1MjEyOV8wNzU/screen-1.jpg?fakeurl=1&type=.jpg"
													alt="First slide"
												/>
												<Carousel.Caption>
													<h3>hhhh</h3>
													<p>mjjj</p>
													<p></p>
												</Carousel.Caption>
											</Carousel.Item>
										);
									})}
								</Carousel>
							</>
						);
					})
				) : (
					<h3>No Books Found :(</h3>
				)} */}
			</>
		);
	}
}

export default BestBooks;
