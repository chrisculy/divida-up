import * as React from "react";
import { Link } from "react-router-dom";
import Panel from "./Panel";

export default class Home extends React.Component<any, never> {
	render() {
		return (
			<div className="col-md-6">
				<Panel title="Groups">
					<Link to="group/add">
						<button type="button" className="btn btn-primary">Add Group</button>
					</Link>
				</Panel>
			</div>
		);
	}
}