import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "react-tooltip/dist/react-tooltip.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tooltip } from "react-tooltip";

const geoUrl = "./florida-counties.json";

const counties = {
  Alachua: ["Gainesville", "High Springs", "Newberry", "Waldo"],
  Baker: ["Macclenny", "Glen St. Mary", "Sanderson", "Olustee"],
  Bay: ["Panama City", "Lynn Haven", "Callaway", "Parker", "Mexico Beach"],
  Bradford: ["Starke", "Lawtey", "Hampton", "Brooker"],
  Brevard: ["Cocoa", "Melbourne", "Palm Bay", "Titusville", "Rockledge"],
  Broward: [
    "Fort Lauderdale",
    "Hollywood",
    "Pembroke Pines",
    "Miramar",
    "Pompano Beach",
    "Coral Springs",
    "Davie",
  ],
  Calhoun: ["Blountstown", "Altha"],
  Charlotte: ["Punta Gorda", "Port Charlotte", "Englewood"],
  Citrus: ["Inverness", "Crystal River", "Homosassa", "Lecanto"],
  Clay: ["Green Cove Springs", "Orange Park", "Fleming Island"],
  Collier: ["Naples", "Marco Island", "Immokalee"],
  Columbia: ["Lake City", "Fort White", "White Springs"],
  DeSoto: ["Arcadia", "Nocatee", "Astatula"],
  Dixie: ["Cross City", "Old Town"],
  Suwannee: ["Live Oak", "Branford", "Wellborn"],
  Duval: [
    "Jacksonville",
    "Atlantic Beach",
    "Neptune Beach",
    "Jacksonville Beach",
  ],
  Escambia: ["Pensacola", "Perdido Key", "Ensley", "McDavid"],
  Flagler: ["Palm Coast", "Bunnell", "Flagler Beach"],
  Franklin: ["Apalachicola", "Carrabelle", "Eastpoint", "St. George Island"],
  Gadsden: ["Quincy", "Chattahoochee", "Havana"],
  Gilchrist: ["Trenton", "Fanning Springs", "Bell"],
  Glades: ["Moore Haven", "Palmdale"],
  Gulf: ["Port St. Joe", "Wewahitchka", "St. Joe Beach"],
  Hamilton: ["Jasper", "White Springs", "Jennings"],
  Hardee: ["Wauchula", "Bowling Green", "Zolfo Springs"],
  Hendry: ["LaBelle", "Clewiston", "Immokalee"],
  Hernando: ["Brooksville", "Spring Hill", "Weeki Wachee"],
  Highlands: ["Sebring", "Lake Placid", "Avon Park"],
  Hillsborough: ["Tampa", "Brandon", "Temple Terrace", "Plant City", "Ruskin"],
  Holmes: ["Bonifay", "Ponce de Leon", "Westville"],
  "Indian River": ["Vero Beach", "Sebastian", "Fellsmere"],
  Jackson: ["Marianna", "Graceville", "Cottondale", "Sneads"],
  Jefferson: ["Monticello", "Aucilla"],
  Lafayette: ["Mayo", "Jena"],
  Lake: ["Tavares", "Leesburg", "Eustis", "Clermont", "Mount Dora"],
  Lee: [
    "Fort Myers",
    "Cape Coral",
    "Lehigh Acres",
    "Bonita Springs",
    "Sanibel",
    "Estero",
  ],
  Leon: ["Tallahassee", "Crawfordville", "Woodville", "Havana"],
  Levy: ["Bronson", "Williston", "Chiefland", "Morriston"],
  Liberty: ["Bristol", "Hosford"],
  Madison: ["Madison", "Greenville", "Cherry Lake"],
  Manatee: ["Bradenton", "Palmetto", "Lakewood Ranch", "Anna Maria"],
  Marion: ["Ocala", "Belleview", "Dunnellon", "Citra"],
  Martin: ["Stuart", "Jensen Beach", "Palm City", "Hobe Sound"],
  "Miami-Dade": [
    "Miami",
    "Hialeah",
    "Miami Beach",
    "Homestead",
    "Coral Gables",
    "Aventura",
    "Doral",
    "North Miami",
  ],
  Monroe: ["Key West", "Marathon", "Tavernier", "Islamorada"],
  Nassau: ["Fernandina Beach", "Yulee", "Callahan"],
  Okaloosa: [
    "Fort Walton Beach",
    "Destin",
    "Niceville",
    "Crestview",
    "Valparaiso",
  ],
  Okeechobee: ["Okeechobee", "Basswood", "Basinger"],
  Orange: [
    "Orlando",
    "Winter Park",
    "Apopka",
    "Ocoee",
    "Maitland",
    "Lake Buena Vista",
  ],
  Osceola: ["Kissimmee", "St. Cloud", "Poinciana", "Harmony"],
  "Palm Beach": [
    "West Palm Beach",
    "Boca Raton",
    "Delray Beach",
    "Lake Worth",
    "Jupiter",
    "Boynton Beach",
    "Palm Springs",
  ],
  Pasco: [
    "New Port Richey",
    "Dade City",
    "Zephyrhills",
    "Hudson",
    "Port Richey",
  ],
  Pinellas: [
    "St. Petersburg",
    "Clearwater",
    "Pinellas Park",
    "Dunedin",
    "Largo",
    "Palm Harbor",
  ],
  Polk: [
    "Lakeland",
    "Winter Haven",
    "Bartow",
    "Lake Wales",
    "Auburndale",
    "Mulberry",
    "Haines City",
  ],
  Putnam: ["Palatka", "Crescent City", "Interlachen", "East Palatka"],
  "St. Johns": ["St. Augustine", "Ponte Vedra Beach", "Elkton"],
  "St. Lucie": ["Fort Pierce", "Port St. Lucie", "Tradition"],
  "Santa Rosa": ["Milton", "Gulf Breeze", "Pace", "Jay"],
  Sarasota: ["Sarasota", "Venice", "North Port", "Osprey", "Englewood"],
  Seminole: [
    "Sanford",
    "Altamonte Springs",
    "Casselberry",
    "Longwood",
    "Lake Mary",
    "Winter Springs",
  ],
  Sumter: ["Bushnell", "Wildwood", "The Villages"],
  Taylor: ["Perry", "Shady Grove", "Steinhatchee"],
  Union: ["Lake Butler"],
  Volusia: [
    "Daytona Beach",
    "Deltona",
    "Ormond Beach",
    "New Smyrna Beach",
    "Edgewater",
  ],
  Wakulla: ["Crawfordville", "Panacea", "St. Marks"],
  Walton: ["DeFuniak Springs", "Santa Rosa Beach", "Freeport", "Miramar Beach"],
  Washington: ["Chipley", "Wausau", "Vernon"],
};

function Map() {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedCounties, setHighlightedCounties] = useState({});
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [250, 550], [0, 1]);
  const yPosition = useTransform(scrollY, [0, 300], [-50, 0]);
  const [floodData, setFloodData] = useState(null);

  // Helper function: find counties containing the city name
  const findCountiesByCity = (city) => {
    let countiesFound = [];
    for (let county in counties) {
      if (counties[county].includes(city)) {
        countiesFound.push(county);
      }
    }
    return countiesFound;
  };

  // Update search term from the input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // When Enter is pressed, fetch flood data and update county selection
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      const foundCounties = findCountiesByCity(searchTerm);

      if (foundCounties.length > 0) {
        const newHighlightedCounties = {};
        foundCounties.forEach((county) => {
          newHighlightedCounties[county] = true;
        });
        setHighlightedCounties(newHighlightedCounties);
        setSelectedCounty(foundCounties[0]);
        setSelectedCity(searchTerm);
      } else {
        console.log("City not found in Florida.");
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/predict_flood_by_city/?city=${encodeURIComponent(
            searchTerm
          )}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setFloodData(data);
      } catch (error) {
        console.error("API error:", error);
        setFloodData({ error: "Error fetching flood risk data." });
      }
    }
  };

  // Handle when a county on the map is clicked
  const handleCountyClick = (countyName) => {
    if (selectedCounty === countyName) {
      setSearchTerm("");
      setHighlightedCounties({});
      setSelectedCounty(null);
      setSelectedCity(null);
    } else {
      setSearchTerm(countyName);
      setHighlightedCounties({ [countyName]: true });
      setSelectedCounty(countyName);
      setSelectedCity(null);
    }
  };

  // Handle clicking a city button
  const handleCityClick = async (cityName) => {
    setSelectedCity(cityName);
    setFloodData(null); // Clear previous data

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/predict_flood_by_city/?city=${encodeURIComponent(
          cityName
        )}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setFloodData(data);
    } catch (error) {
      console.error("API error:", error);
      setFloodData({ error: "Error fetching flood risk data." });
    }
  };

  // Tooltip mouse events
  const handleMouseEnter = (event, countyName) => {
    const mapElement = event.target.closest(".map-container");
    const { left, top } = mapElement.getBoundingClientRect();
    const { clientX, clientY } = event;
    setTooltipPosition({
      x: clientX - left - 10,
      y: clientY - top - 60,
    });
    setTooltipContent(countyName);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div
      id="map"
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(to top right, #589FE0 92%, #5CAEDE 99%)",
      }}
    >
      {/* Search Bar Section */}
      <motion.div
        className="absolute bg-white rounded-lg top-4 left-1/2 transform -translate-x-1/2 w-1/2 z-50"
        style={{ opacity, y: yPosition }}
      >
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg shadow-lg"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
      </motion.div>
      {/* End of Search Bar Section */}

      {/* Map and Info Section */}
      <div
        className={`flex transition-all duration-300 ${
          selectedCounty ? "w-[75%]" : "w-full"
        } h-[85%] items-center`}
      >
        <div
          className={`relative map-container transition-all duration-300 ${
            selectedCounty ? "w-2/3" : "w-full"
          } h-full`}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 4000, center: [-83, 28] }}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countyName = geo.properties.county;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        highlightedCounties[countyName] ? "#FF5733" : "#D6D6DA"
                      }
                      stroke="#FFFFFF"
                      onClick={() => handleCountyClick(countyName)}
                      onMouseEnter={(e) => handleMouseEnter(e, countyName)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#ECEFF1" },
                        pressed: { outline: "none", fill: "#BDBDBD" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {tooltipContent && (
            <div
              className="absolute bg-black text-white p-2 rounded"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                pointerEvents: "none",
              }}
            >
              {tooltipContent}
            </div>
          )}
        </div>

        {selectedCounty && (
          <div
            className="w-1/3 h-[80%] p-4 shadow-2xl overflow-auto backdrop-blur-lg rounded-xl flex flex-col"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 82, 2, 0.85), rgba(255, 143, 92, 0.85))",
            }}
          >
            {selectedCity ? (
              <>
                <h2 className="text-xl font-bold text-white text-center">
                  {selectedCity}
                </h2>
                <p className="text-white text-center mt-2"></p>
                {floodData ? (
                  <>
                    <p>
                      <strong>Flood Risk:</strong> {floodData.flood_risk}
                    </p>
                    <p>
                      <strong>Min Temp (°C):</strong>{" "}
                      {floodData["min_temp (°C)"]}
                    </p>
                    <p>
                      <strong>Max Temp (°C):</strong>{" "}
                      {floodData["max_temp (°C)"]}
                    </p>
                    <p>
                      <strong>Avg Temp (°C):</strong>{" "}
                      {floodData["avg_temp (°C)"]}
                    </p>
                    <p>
                      <strong>Avg Humidity (%):</strong>{" "}
                      {floodData["avg_humidity (%)"]}
                    </p>
                    <p>
                      <strong>Max Wind Speed (m/s):</strong>{" "}
                      {floodData["max_wind_speed (m/s)"]}
                    </p>
                    <p>
                      <strong>Wind Direction at Max (°):</strong>{" "}
                      {floodData["wind_direction_at_max (°)"]}
                    </p>
                    <p>
                      <strong>Avg Wind Speed (m/s):</strong>{" "}
                      {floodData["avg_wind_speed (m/s)"]}
                    </p>
                    <p>
                      <strong>Rainfall (mm):</strong>{" "}
                      {floodData["rainfall (mm)"]}
                    </p>
                    <p>
                      <strong>Rainfall-Humidity Interaction:</strong>{" "}
                      {floodData["rainfall_humidity_interaction"]}
                    </p>
                  </>
                ) : (
                  <p>Loading flood data...</p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white text-center">
                  {selectedCounty}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {counties[selectedCounty]?.map((city) => (
                    <button
                      key={city}
                      className="bg-white text-black px-3 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                      onClick={() => handleCityClick(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
