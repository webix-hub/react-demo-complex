// example of custom component with Webix UI inside
// this one is a static view, not linked to the React data store

import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import "@xbs/webix-pro/webix.css";
import "@xbs/filemanager/codebase/filemanager.css";

function FilesView(props) {
  const uiFiles = useRef(null);
  const uiContainer = useRef(null);

  // init File Manager (called once instead of componentDidMount)
  // `return` of this effect does the job of componentWillUnmount
  useEffect(() => {
    const resObserver = new ResizeObserver(() => {
      if (uiFiles.current) uiFiles.current.adjust();
    });

    const container = ReactDOM.findDOMNode(uiContainer.current);

    webix.ready(() => {
      require("@xbs/filemanager");

      uiFiles.current = webix.ui({
        view: "filemanager",
        url: "https://docs.webix.com/filemanager-backend/",
        container,
      });
    });

    resObserver.observe(container);

    return () => {
      if (uiFiles.current) {
        uiFiles.current.destructor();
        uiFiles.current = null;
      }
      resObserver.disconnect();
    };
  }, []); // []: do not track any params, call only once

  return <div ref={uiContainer} style={{ height: "100%" }}></div>;
}

export default FilesView;
