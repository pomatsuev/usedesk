import { createRoot } from "react-dom/client";
import App from "./index";

export default function (el) {
    const container = createRoot(el);
    container.render(<App />);
}