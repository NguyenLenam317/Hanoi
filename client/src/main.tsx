import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "EcoSense";

createRoot(document.getElementById("root")!).render(<App />);
