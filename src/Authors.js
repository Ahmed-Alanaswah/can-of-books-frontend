import React, { Component } from "react";

class Authors extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.author}</h1>
				<h1>{this.props.Books}</h1>

				<h1>{this.props.authorId}</h1>
				<button onClick={() => this.props.handledelete(this.props.authorId)}>
					delete
				</button>
			</div>
		);
	}
}

export default Authors;
