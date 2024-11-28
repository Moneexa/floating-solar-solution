import math
from fastapi import FastAPI, Response
import xarray as xr

app = FastAPI()

DATASET_PATH = "waves_2019-01-01.nc"
dataset = xr.open_dataset(DATASET_PATH)
wave_data_global = dataset["hmax"]
wave_data_2019=wave_data_global.sel(time="2019-01-01")


@app.get("/max_wave")
async def read_item(lat: float, lon: float, response: Response):
    try:
        max_wave_2019_return_value=""
        max_wave_since_1950_return_value=""

        nearest_data_2019 = wave_data_2019.sel(latitude=lat, longitude=lon, method="nearest")
        max_wave_2019 = nearest_data_2019.max(skipna=True).values
        if math.isnan(max_wave_2019):
            max_wave_2019_return_value="No Valid Value Available for this position"
        else:
           max_wave_2019_return_value = f"{float(max_wave_2019):.4f} m"

   
       # Query max wave height since 1950 (full dataset time range)
        all_max_wave_global = wave_data_global.sel(latitude=lat, longitude=lon, method="nearest")
        nearest_global_data = all_max_wave_global.max().values
        if math.isnan(nearest_global_data):
            max_wave_since_1950_return_value="No Valid Value Available for this position"
        else:    
            max_wave_since_1950_return_value = f"{float(nearest_global_data):.3f} m"  # Extract the actual value

        return {
            "max_wave_height_2019": max_wave_2019_return_value,
            "max_wave_height_since_1950": max_wave_since_1950_return_value,
            "nearest_max_wave_location_2019": {
                "lat": float(nearest_data_2019['latitude'].values),
                "lon": float(nearest_data_2019['longitude'].values),
            }
        }
    except Exception as e:
        response.status_code = 500
        return {"error": str(e)}