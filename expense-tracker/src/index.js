import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "./index.css"
import { Provider } from "./Context/Context"

ReactDom.render(
    <Provider>
        <App />
    </Provider>
    , document.getElementById("root"))
