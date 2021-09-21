import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import axios from "axios";
import Authors from "./Authors";
// import { Header } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			authorsList: [],
			Books: {
				title: "progreammer",
				desciption: "lorem ipsum...............",
				status: "available",
			},
			author: "",
		};
	}

	componentDidMount = () => {
		axios.get("http://localhost:3000/").then((res) => {
			this.setState({
				authorsList: res.data,
			});
			console.log(this.state.authorsList);
		});
	};

	handleAuthorInput = (e) => {
		this.setState({
			author: e.target.value,
		});

		console.log(this.state.author);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let config = {
			method: "POST",
			baseURL: "http://localhost:3000",
			url: "/create-book",
			data: {
				author: this.state.author,
				Books: this.state.Books,
			},
		};

		axios(config).then((res) => {
			this.setState({
				authorsList: res.data,
			});
			console.log(res.data);
		});
	};

	handledelete = (id) => {
		let authorId = id;
		let config = {
			method: "DELETE",
			baseURL: "http://localhost:3000",
			url: `/delete-book/${authorId}`,
		};
		axios(config).then((res) => {
			this.setState({
				authorsList: res.data,
			});
		});
	};

	loginHandler = (user) => {
		this.setState({
			user,
		});
	};

	logoutHandler = () => {
		this.setState({
			user: null,
		});
	};

	render() {
		return (
			<>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							type="text"
							placeholder="Enter author name"
							onChange={this.handleAuthorInput}
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control type="text" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Button variant="primary" type="submit">
						Craete author
					</Button>
				</Form>
				<Router>
					<Header user={this.state.user} onLogout={this.logoutHandler} />
					<Switch>
						<Route exact path="/">
							{/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
							{this.state.authorsList.map((auth) => {
								return (
									<Authors
										author={auth.author}
										Books={auth.Books}
										authorId={auth._id}
										handledelete={this.handledelete}
									/>
								);
							})}
							<BestBooks />
						</Route>
						{/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
					</Switch>
					<Footer />
				</Router>
			</>
		);
	}
}

export default App;
