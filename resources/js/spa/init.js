import { createRoot } from "react-dom/client";
import App from "./index";
import {BrowserRouter as Router} from "react-router-dom";
import {ProvideAuth} from "./context/authContext";

export default function (el) {
    const container = createRoot(el);
    container.render(<ProvideAuth><Router><App /></Router></ProvideAuth>);
}