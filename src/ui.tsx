import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { PreviewApp } from "./PreviewApp";

const PREVIEW_ENV = process.env.PREVIEW_ENV;

render(
  !PREVIEW_ENV ? <App /> : <PreviewApp />,
  document.getElementById("react-page")
);
