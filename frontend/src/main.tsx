import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { APIProvider } from "@vis.gl/react-google-maps";
import { DataProvider } from "./store/data";
const apiKey = "AIzaSyD8FiHTNTwn2UZKLHJOcLKFS31trKggVQ8";

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
