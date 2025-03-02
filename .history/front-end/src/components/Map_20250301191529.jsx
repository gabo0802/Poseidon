import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "./florida-counties.json";

const counties = {
  // ... (your counties data)
};

function Map() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);

  const findCountiesByCity = (city) => {
    for (let county in counties) {
      if (counties[county].includes(city)) {
        return county;
      }
    }
    return null;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const foundCounty = findCountiesByCity(searchTerm);
      setSelectedCounty(foundCounty);
      console.log(foundCounty ? foundCounty : "City not found in Florida.");
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">See your Community</h1>
      </div>

      <div className="w-3/5 my-4">
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full p-1 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="w-4/5 h-4/5">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [-83, 28], // Approximate center of Florida
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countyName = geo.properties.county; // Corrected to match your JSON structure

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countyName === selectedCounty ? "blue" : "#E5E5F7"}
                    stroke="#FFFFFF"
                    tabIndex={-1}
                    onClick={() => console.log(`Clicked county: ${countyName}`)}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "blue" },
                      pressed: { outline: "none", fill: "red" }, // Optional: change color on click
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;
