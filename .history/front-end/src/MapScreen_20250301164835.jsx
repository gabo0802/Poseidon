import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/florida-counties.json";

function MapScreen() {
  return (
    <>
      <div
        className="mainContainer"
        style={{
          display: "flex", // Ensure flex display to center content
          justifyContent: "center", // Centers the map horizontally
          alignItems: "center", // Centers the map vertically
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
          backgroundColor: "#E5E5F7", // Change background color if needed
          overflow: "hidden", // Prevent overflow outside the viewport
        }}
      >
        <div className="headingContainer">
          <h1 className="heading">See your Community</h1>
        </div>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000, // Adjust scale for size
            translate: [0, 0], // Move the map to the center of the screen
          }}
          width={1000} // Explicit width of the map
          height={800} // Explicit height of the map
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
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

export default MapScreen;
