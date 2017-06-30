import * as React from "react";

export interface RootProps {
	children?: any
}

export default class Root extends React.Component<RootProps, never> {
	render() {
		return (
			<div className="container">
				<h2>divida-up</h2>
				<div className="jumbotron col-lg-12">
					{this.props.children}
				</div>
			</div>
		);
	}
}
