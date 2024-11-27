import { Map, MapMouseEvent, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useContext } from "react";
import { DataContext } from "../store/data";
import waveIcon from "../assets/wave.png";
const mapId = "somerandomid";
export function MapView() {
  const { marker, actions } = useContext(DataContext);
  const handleClick = async (ev: MapMouseEvent) => {
    if (!ev.detail.latLng) {
      console.error("Event does not have latLng.");
      alert("Invalid area selected");
      return;
    }
    actions.loadData(ev.detail.latLng.lat, ev.detail.latLng.lng);
  };
  return (
    <Map
      mapId={mapId}
      defaultZoom={7}
      draggableCursor="pointer"
      gestureHandling={"greedy"}
      defaultCenter={{ lat: 59, lng: 10.5 }}
      style={{ width: "100%", height: "100%" }}
      onClick={handleClick}
    >
      {marker && (
        <AdvancedMarker position={{ lat: marker.lat, lng: marker.lng }}>
          <img className="marker-icon" src={waveIcon} alt="" />
        </AdvancedMarker>
      )}
    </Map>
  );
}
