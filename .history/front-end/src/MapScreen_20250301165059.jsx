import React, { useRef, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/florida-counties.json";

function MapScreen() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log(
        "Map container size:",
        mapRef.current.getBoundingClientRect()
      );
    }
  }, []);

  return (
    <>
      <div
        className="mainContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#E5E5F7",
          overflow: "hidden",
        }}
      >
        <div className="headingContainer">
          <h1 className="heading">See your Community</h1>
        </div>
        <ComposableMap
          ref={mapRef} // Add ref to check if map is rendered properly
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000, // Adjust scale for size
            translate: [300, 150], // Adjust these values to move the map
          }}
          width="80%" // Make map width responsive
          height="80%" // Make map height responsive
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
