// example of custom component with Webix UI inside
// this one is a static view, not linked to the React data store

import React, { Component } from "react";

import "@xbs/webix-pro/webix.css";
import "@xbs/filemanager/codebase/filemanager.css";

class FilesView extends Component {
	constructor(props) {
		super(props);
		this.uiContainer = React.createRef(null);
	}

	render() {
		return <div ref={this.uiContainer} style={{ height: "100%" }}></div>;
	}

	componentDidMount() {
		const container = this.uiContainer.current;

		webix.ready(() => {
			const fManager = require("@xbs/filemanager");

			this.app = new fManager.App({
				webix,	// provide the global Webix scope
				url: "https://docs.webix.com/filemanager-backend/",
			});

			this.app.render(container).then(() => {
				this.resObserver = new ResizeObserver(() => {
					const view = this.app.getRoot();
					if (view) view.adjust();
				});
				this.resObserver.observe(container);
			});
		});
	}

	componentWillUnmount() {
		if (this.app) {
			if (this.app.getRoot() && this.resObserver) this.resObserver.disconnect();

			this.app.destructor();
			this.app = null;
		}
	}

	shouldComponentUpdate() {
		// as component is not linked to the in-app data model, there is no need in updates
		return false;
	}
}

export default FilesView;
