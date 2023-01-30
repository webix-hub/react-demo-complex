Webix-React demo with a Jet-based Complex Widget
================

This repo contains examples of importing Webix [Complex Widgets](https://webix.com/widget/complex-widgets/) into a React App.<br/>
By default, the demo shows how to initialize the [**File Manager**](https://webix.com/filemanager/) and [**Spreadsheet**](https://webix.com/spreadsheet/), but it can be replaced with any of Webix Complex Widgets. 


Installation notes
----------------
Complex widgets are PRO components.<br/>By default, Webix, Spreadsheet, and File Manager are fetched from npm, so make sure you have signed in to our [private @xbs scope](https://docs.webix.com/desktop__install.html#installingwithnpm). <br/>
**Note**: NPM always provides access to the latest versions of packages, so credentials are valid only while the license is active. <br/>
Alternatively, you can remove these dependencies, include the "codebase" of Webix/Complex widget to your project, and import files using custom path. This can be done for **Trial** package as well (check [webix.com/download](https://webix.com/download/)).

Webpack configuration and basic dependencies in package.json is the default outcome of the `npm eject` command. The initial project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

How to Start
----------------

```
npm install
npm start
```
<br/>
Open `http://localhost:3000` to view the demo in the browser.


**Production build**

To build the production version, run `npm run build`.

It will build the application for production to the *build* folder. After that your app is ready to be deployed.

How to import and use a Complex Widget
-------
### Option 1: Global import (see the [main](https://github.com/webix-hub/react-demo-complex/tree/main) branch)

The minimum requirements to init the Spreadsheet/File Manager in a React app are
- have a global Webix object  (it should be available *before* the component's sources are imported).
Since there're two complex widgets in this demo, the global assignment was moved to `index.js`.
- import the widget from "@xbs/filemanager"`.

```js
import * as webix from "@xbs/webix-pro";
window.webix = webix;
```

```js
componentDidMount() {
   webix.ready(() => {
      require("@xbs/filemanager")
      webix.ui({ 
         view:"filemanager",
         container: ReactDOM.findDOMNode(this.uiContainer.current);
      });
   })
}
```

### Option 2: ProvidePlugin (see the [demo-provideplugin](https://github.com/webix-hub/react-demo-complex/tree/demo-provideplugin) branch)

Another option is to use [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/).
This is required if you want to initialize the File Manager [as a Jet application](https://docs.webix.com/filemanager__creating_filemanager.html) (or other complex widgets that support this feature).<br/> 
The Spreadsheet and Kanban will be initialized in the same way as in the 1st option.

In Webpack configuration, add 
```js
new webpack.ProvidePlugin({
   webix: "@xbs/webix-pro",
}),
```
So that the webix will be available in all modules.

```js
componentDidMount(){
   webix.ready(() => {
      const fManager = require("@xbs/filemanager");

      this.app = new fManager.App({
         webix,	// provide the global Webix scope
         url: "https://docs.webix.com/filemanager-backend/",
      });
      this.app.render(ReactDOM.findDOMNode(this.uiContainer.current))
   })
}
```
### ESLint

If you use ESLint with the [`no-undef`](https://eslint.org/docs/rules/no-undef) rule, you'll also need to extend these settings with the [following statement](https://eslint.org/docs/user-guide/configuring#specifying-globals), as `ProvidePlugin` allows to refer to a global value without importing/defining Webix in a module.
```
"globals": {
   "webix": "readonly"
}
```

License
--------

MIT
