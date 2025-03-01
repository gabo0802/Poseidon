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
          backgroundColor: "#E5E5F7",
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
            scale: 8000,
            center: [0, 27.8],
            rotate: [83, 0, 0],
          }}
          style={{
            width: "100%",
            height: "auto",
          }}
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
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: "#F53",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
                    },
                    pressed: {
                      fill: "#E42",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.5,
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
