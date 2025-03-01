import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "./florida-counties.json";

function Map() {
  return (
    <>
      <div
        className="mainContainer"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#ffffff",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <div className="headingContainer">
          <h1 className="heading">See your Community</h1>
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [-83, 28], // Approximate center of Florida
          }}
          style={{
            width: "80%",
            height: "80vh",
            margin: "0 auto",
          }}
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
