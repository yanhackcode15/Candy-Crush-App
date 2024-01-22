
import React from "react"
import ReactDOM from "react-dom"
import "./index.css" //this is how css is compiled in React. the loader is in webpack
import App from "./app"


ReactDOM.render(
    <App />,
    document.getElementById("root")
)
