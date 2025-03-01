import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "./florida-counties.json";

function Map() {
  return (
    <>
      <div className="w-screen h-screen bg-white overflow-hidden">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">See your Community</h1>
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [-83, 28], // Approximate center of Florida
          }}
          className="w-4/5 h-4/5 mx-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E5F7"
                  stroke="#FFFFFF" // Optional stroke for borders
                  tabIndex={-1} // Ensure the geography is not focusable (non-interactive)
                  style={{
                    default: {
                      outline: "none", // Remove outline for default state
                    },
                    hover: {
                      outline: "none", // Remove outline for hover state
                      fill: "blue", // Change color on hover
                    },
                    pressed: {
                      outline: "none", // Remove outline for pressed state
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
}

export default Map;
