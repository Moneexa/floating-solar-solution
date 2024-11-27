import { useContext, useMemo } from "react";
import { DataContext } from "../store/data";
import { assessWaveDanger } from "./utils";

export function Sidebar() {
  const { marker } = useContext(DataContext);
  const waveAssessment = useMemo(() => {
    const heightString = marker?.waveHeight2019?.split(" ")[0];
    if (!heightString) return null;
    const height = parseFloat(heightString);
    if (isNaN(height)) return null;
    return assessWaveDanger(height);
  }, [marker]);
  return (
    <>
      <div className="header padding">Wave information</div>
      <div className="padding">
        <b>Nearest wave on 01 Jan 2019</b>
        <p>Latitude: {marker?.lat}</p>
        <p>Longitude: {marker?.lng}</p>
        <b>Max wave height on 01 Jan 2019</b>
        <p>{marker?.waveHeight2019}</p>
        <b>Max wave height since 1950</b>
        <p>{marker?.maxWaveHeight}</p>
        {waveAssessment && (
          <div
            className="gauge"
            style={
              {
                width: "100%",
                "--gauge-rotation": `${waveAssessment.gaugeAngle}deg`,
                "--gauge-color": waveAssessment.color,
              } as React.CSSProperties
            }
          >
            <div className="percentage"></div>
            <div className="mask"></div>
            <span className="value">{marker?.waveHeight2019}</span>
          </div>
        )}
      </div>
    </>
  );
}
