import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import RootStore from "./Stores";

// 스토어 인스턴스 생성
const root = new RootStore();

ReactDOM.render(<Provider {...root}><App /></Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
