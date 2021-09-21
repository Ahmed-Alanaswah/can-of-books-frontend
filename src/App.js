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
				description: "lorem ipsum...............",
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
	};
	handleTitle = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	handleDescription = (e) => {
		this.setState({
			description: e.target.value,
		});
	};
	handleStatus = (e) => {
		this.setState({
			status: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		let config = {
			method: "POST",
			baseURL: "http://localhost:3000",
			url: "/create-book",
			data: {
				author: this.state.author,
				Bookd: { title: this.state.Books.title },
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
				<Router>
					<Header user={this.state.user} onLogout={this.logoutHandler} />
					<Form onSubmit={this.handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control
								type="text"
								placeholder="Enter author name"
								onChange={this.handleAuthorInput}
								name="author"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control
								type="text"
								placeholder="Enter title"
								onChange={this.handleTitle}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control
								type="text"
								placeholder="Enter "
								onChange={this.handleDescription}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Control
								type="text"
								placeholder="Enter title"
								onChange={this.handleTitle}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Craete author
						</Button>
					</Form>
					<Switch>
						<Route exact path="/">
							{/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
							{this.state.authorsList.map((auth) => {
								return (
									<Authors
										author={auth.author}
										title={auth.Books}
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
