import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/florida-counties.json";

function MapScreen() {
  return (
    <>
      <div
        className="mainContainer"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#red",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <div className="headingContainer">
          <h1 className="heading">See your Community</h1>
        </div>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 300,
            center: [0, 0], // Center point of the projection
            translate: [400, 200], // Adjust these values to move the map position
            rotate: [0, 0, 0], // Optional rotation if needed
          }}
          width={800} // Set explicit width
          height={600} // Set explicit height
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
