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
          projection="geoAlbersUsa" // Use a projection that suits your needs (geoAlbersUsa is often used for U.S. maps)
          projectionConfig={{
            scale: 5000, // Increase the scale to make the map objects larger
            translate: [50, 50], // Adjust translation to center the map as needed
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
                      fill: "#D6D6DA", // Color for default state
                      outline: "none", // Removes borders between areas
                    },
                    hover: {
                      fill: "#F53", // Color on hover
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42", // Color when clicked
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
