// example of custom component with Webix UI inside
// this one is a static view, not linked to the React data store

import React, { useRef, useEffect } from "react";

import "@xbs/webix-pro/webix.css";
import "@xbs/spreadsheet/spreadsheet.css";

function SheetsView(props) {
  const uiSheets = useRef(null);
  const uiContainer = useRef(null);

  // init Spreadsheet (called once instead of componentDidMount)
  // `return` of this effect does the job of componentWillUnmount
  useEffect(() => {
    const resObserver = new ResizeObserver(() => {
      if (uiSheets.current) uiSheets.current.adjust();
    });

    const container = uiContainer.current;

    webix.ready(() => {
      require("@xbs/spreadsheet");

      uiSheets.current = webix.ui({
        view: "spreadsheet",
        toolbar: "full",
        container,
      });
    });

    resObserver.observe(container);

    return () => {
      if (uiSheets.current) {
        uiSheets.current.destructor();
        uiSheets.current = null;
      }
      resObserver.disconnect();
    };
  }, []); // []: do not track any params, call only once

  return <div ref={uiContainer} style={{ height: "100%" }}></div>;
}

export default SheetsView;
