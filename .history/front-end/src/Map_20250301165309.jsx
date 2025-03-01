import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/florida-counties.json";

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
                  style={{
                    default: {
                      fill: "#E5E5F7",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                    },
                    hover: {
                      fill: "#A9A9A9",
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

export default Map;
