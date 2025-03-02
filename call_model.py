import pandas as pd
import numpy as np
import joblib
import lightgbm as lgb
import requests
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()
model = joblib.load('best_model.pkl')

def geocode_city(city: str) -> dict:
    if "florida" not in city.lower():
        city = f"{city}, Florida"
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": city,
        "format": "json",
        "limit": 1
    }

    response = requests.get(url, params=params, headers={"User-Agent": "MyApp"})

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching weather data")
    results = response.json()
    if not results:
         raise HTTPException(status_code=404, detail="City not found")
    return {"lat": float(results[0]["lat"]), "lon": float(results[0]["lon"])}


def fetch_weather_data(latitude: float, longitude: float) -> dict:
    url = (f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={latitude}&longitude={longitude}"
        f"&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m"
        f"&timezone=auto"
    )

    response =  requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching weather data")
    data = response.json()

     # calculate the average for each parameter (or use another aggregation as needed)
    temps = np.array(data["hourly"]["temperature_2m"])
    humidities = np.array(data["hourly"]["relativehumidity_2m"])
    precipitation = np.array(data["hourly"]["precipitation"])
    wind_speed_kmh = np.array(data["hourly"]["windspeed_10m"])
    wind_direction = np.array(data["hourly"]["winddirection_10m"])
        
    # convert wind speed from km/h to m/s
    wind_speed_ms = wind_speed_kmh * 0.27778

    min_temp = np.min(temps)
    max_temp = np.max(temps)
    avg_temp = np.mean(temps)

    avg_humidity = np.mean(humidities)

    rainfall = np.mean(precipitation)

    max_wind_speed = np.max(wind_speed_ms)
    avg_wind_speed = np.mean(wind_speed_ms)

    idx_max_wind = np.argmax(wind_speed_ms)
    wind_direction_at_max = wind_direction[idx_max_wind]

    rainfall_humidity_interaction = rainfall * avg_humidity
    
    aggregated_weather = {
        "min_temp (°C)": min_temp,
        "max_temp (°C)": max_temp,
        "avg_temp (°C)": avg_temp,
        "avg_humidity (%)": avg_humidity,
        "max_wind_speed (m/s)": max_wind_speed,
        "wind_direction_at_max (°)": wind_direction_at_max,
        "avg_wind_speed (m/s)": avg_wind_speed,
        "rainfall (mm)": rainfall,
        "rainfall_humidity_interaction": rainfall_humidity_interaction
    }

    return aggregated_weather

@app.get("/predict_flood_by_city/")
def predict_flood(city: str):
    coords = geocode_city(city)
    lat = coords["lat"]
    lon = coords["lon"]
    weather_data = fetch_weather_data(lat, lon)
    input_data = pd.DataFrame([weather_data])
    flood_risk = model.predict(input_data)

    risk_value = int(round(float(flood_risk[0]), 0))
    if risk_value == 0:
        risk_label = "Safe"
    elif risk_value == 1:
        risk_label = "Danger"
    else:
        risk_label = str(risk_value)

    # return the prediction as a JSON response
    return JSONResponse(content={
        "city": city,
        "location": f"{lat}, {lon}",
        "flood_risk": risk_label,
        "min_temp (°C)": round(float(weather_data["min_temp (°C)"]), 2),
        "max_temp (°C)": round(float(weather_data["max_temp (°C)"]), 2),
        "avg_temp (°C)": round(float(weather_data["avg_temp (°C)"]), 2),
        "avg_humidity (%)": round(float(weather_data["avg_humidity (%)"]), 2),
        "max_wind_speed (m/s)": round(float(weather_data["max_wind_speed (m/s)"]), 2),
        "wind_direction_at_max (°)": round(float(weather_data["wind_direction_at_max (°)"]), 2),
        "avg_wind_speed (m/s)": round(float(weather_data["avg_wind_speed (m/s)"]), 2),
        "rainfall (mm)": round(float(weather_data["rainfall (mm)"]), 2),
        "rainfall_humidity_interaction": round(float(weather_data["rainfall_humidity_interaction"]), 2)
    })
