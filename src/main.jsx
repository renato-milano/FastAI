import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Chat } from "./pages/Chat.jsx";

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-gradient-to-t from-gray-800 to-blue-900">
      <Chat />
    </div>
  </StrictMode>
);
