import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import axios from "axios";
import Authors from "./Authors";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SpecialContent from "./SpecialContent";
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

			author: "",
			title: "",
			description: "",
			email: "",
			id: "",
			showUpdate: false,
		};
	}

	componentDidMount = () => {
		axios.get("https://card-book-ahmedlalanswah.herokuapp.com").then((res) => {
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
			email: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		let config = {
			method: "POST",
			baseURL: "https://card-book-ahmedlalanswah.herokuapp.com",
			url: "/create-book",
			data: {
				author: this.state.author,
				title: this.state.title,
				description: this.state.description,
				email: this.state.email,
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
			baseURL: "https://card-book-ahmedlalanswah.herokuapp.com",
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
	handleUpdate = (author, description, title, email, id) => {
		this.setState({
			author: author,
			title: title,
			description: description,
			email: email,
			id: id,
			showUpdate: true,
		});
	};

	handleUpdateform = () => {
		let config = {
			method: "Put",
			baseURL: "https://card-book-ahmedlalanswah.herokuapp.com",
			url: `/update-book/${this.state.id}`,
			data: {
				author: this.state.author,
				title: this.state.title,
				description: this.state.description,
				email: this.state.email,
			},
		};
		axios(config).then((res) => {
			this.setState({
				authorsList: res.data,
			});
		});
	};
	render() {
		return (
			<>
				<Router>
					<Header user={this.state.user} onLogout={this.logoutHandler} />

					<LoginButton />
					<LogoutButton />
					<SpecialContent />
					{!this.state.showUpdate ? (
						<>
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
										placeholder="Enter description"
										onChange={this.handleDescription}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Control
										type="text"
										placeholder="Enter status"
										onChange={this.handleStatus}
									/>
								</Form.Group>
								<Button variant="primary" type="submit">
									Craete author
								</Button>
							</Form>
						</>
					) : (
						// update form
						<Form onSubmit={this.handleUpdateform}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									type="text"
									placeholder="Enter author name"
									onChange={this.handleAuthorInput}
									name="author"
									value={this.state.author}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									type="text"
									placeholder="Enter title"
									onChange={this.handleTitle}
									value={this.state.title}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									type="text"
									placeholder="Enter description"
									onChange={this.handleDescription}
									value={this.state.description}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Control
									type="text"
									placeholder="Enter email"
									onChange={this.handleStatus}
									value={this.state.email}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								update author
							</Button>
						</Form>
					)}

					<Switch>
						<Route exact path="/">
							{/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
							{this.state.authorsList.map((auth) => {
								return (
									<Authors
										author={auth.author}
										title={auth.title}
										description={auth.description}
										email={auth.email}
										authorId={auth._id}
										handledelete={this.handledelete}
										handleUpdate={this.handleUpdate}
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
