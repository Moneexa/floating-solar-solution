import { MapView } from "./MapView/MapView";
import { Sidebar } from "./Sidebar/Sidebar";
import "./App.css";
import { useContext } from "react";
import { DataContext } from "./store/data";

function App() {
  const { marker } = useContext(DataContext);
  return (
    <div className="layout">
      <div className="map-container">
        <MapView />
      </div>
      {marker && (
        <div className="sidebar-container">
          <Sidebar />
        </div>
      )}
    </div>
  );
}
export default App;
