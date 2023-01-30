// example of custom component with Webix UI inside
// this one is a static view, not linked to the React data store

import React from "react";

export const Home = () => (
	<div>
		<p>
			When you are working with a combination of React and Webix, Webix UI
			elements should be wrapped in custom components.
		</p>
		<p>
			If you are using complex widgets (such as File Manager, Spreadsheet,
			etc.), make sure that Webix is available globally.
		</p>
		<p>
			This technique will work fine if you need to add a few Webix
			widgets to a React-based app.
		</p>
		<hr />
		<p>
			Original example at{" "}
			<a target="blank" href="https://github.com/webix-hub/react-demo-complex">
				github.com/webix-hub/react-demo-complex
			</a>
		</p>
		<p>
			If you are planning to create an app with plenty of Webix widgets, check{" "}
			<a target="blank" href="https://webix.gitbook.io/webix-jet/">
				Webix Jet
			</a>{" "}
			first.{" "}
		</p>
	</div>
);

export default Home;
