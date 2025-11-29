import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'flowbite';
import { AppContextProvider } from "./AuthenticationPage/context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
