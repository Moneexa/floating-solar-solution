import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { APIProvider } from "@vis.gl/react-google-maps";
import { DataProvider } from "./store/data";
const apiKey = "AIzaSyCmhwxgkFS_R3sOr4LhiRDa8aIBGWd6vRM";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <APIProvider
        apiKey={apiKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <App />
      </APIProvider>
    </DataProvider>
  </StrictMode>
);
