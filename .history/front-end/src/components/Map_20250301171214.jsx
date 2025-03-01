import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/florida-counties.json";

function Map() {
  return (
    <>
      <div className="w-screen h-screen bg-white overflow-hidden">
        <div className="text-center">
          <h1 className="text-4xl font-bold my-8">See your Community</h1>
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [-83, 28], // Approximate center of Florida
          }}
          className="w-4/5 h-[80vh] mx-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E5F7"
                  stroke="#FFFFFF"
                  tabIndex={-1}
                  className="outline-none hover:fill-gray-400 active:outline-none"
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
