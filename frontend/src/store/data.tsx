import axios from "axios";
import { createContext, useState } from "react";

type Marker = {
  lat: number;
  lng: number;
  waveHeight2019: string;
  maxWaveHeight: string;
};

type Data = {
  marker?: Marker;
  actions: {
    loadData: (lat: number, lng: number) => void;
  };
};

const defaultData: Data = {
  actions: {
    loadData: () => {},
  },
};

export const DataContext = createContext(defaultData);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [marker, setMarker] = useState<Marker | undefined>();
  const loadData = async (lat: number, lng: number) => {
    const response = await axios.get(`/max_wave?lat=${lat}&lon=${lng}`);
    if (response) {
      console.log(response.data);
      setMarker({
        waveHeight2019: response.data.max_wave_height_2019,
        maxWaveHeight: response.data.max_wave_height_since_1950,
        lat: response.data.nearest_max_wave_location_2019.lat,
        lng: response.data.nearest_max_wave_location_2019.lon,
      });
    }
  };
  return (
    <DataContext.Provider value={{ marker, actions: { loadData } }}>
      {children}
    </DataContext.Provider>
  );
};
