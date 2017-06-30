import * as React from "react"

export interface PanelProps {
	title: string;
	children?: any
}

export default function Panel(props: PanelProps) {
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">{props.title}</div>
			<div className="panel-body">
				{props.children}
			</div>
		</div>
	);
}
