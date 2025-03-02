import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const geoUrl = "./florida-counties.json";

const counties = {
  Alachua: ["Gainesville", "Alachua", "High Springs", "Newberry", "Waldo"],
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
  Dixie: ["Cross City", "Old Town", "Suwannee"],
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
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedCounty, setHighlightedCounty] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Find counties by city
  const findCountiesByCity = (city) => {
    return Object.keys(counties).filter((county) =>
      counties[county].includes(city)
    );
  };

  // Handle Enter key in the search bar
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const foundCounties = findCountiesByCity(searchTerm);

      if (foundCounties.length > 0) {
        setHighlightedCounty(foundCounties[0]); // Only highlight the first county found
      } else {
        console.log("City not found in Florida.");
      }
    }
  };

  // Handle county click (toggle selection)
  const handleCountyClick = (countyName) => {
    if (highlightedCounty === countyName) {
      setHighlightedCounty(null); // Unhighlight if clicked again
      setSearchTerm(""); // Clear search bar
    } else {
      setHighlightedCounty(countyName); // Highlight new county
      setSearchTerm(countyName); // Update search bar
    }
  };

  // Handle tooltip positioning on hover
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
      className="w-screen h-screen flex overflow-hidden"
      style={{
        background: "linear-gradient(to top right, #589FE0 92%, #5CAEDE 99%)",
      }}
    >
      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center w-3/4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">See your Community</h1>
        </div>

        {/* Search Bar */}
        <div className="w-3/5 my-4">
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Map Section */}
        <div className="w-full h-[80%] relative map-container">
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
                        highlightedCounty === countyName ? "#FF5733" : "#D6D6DA"
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

          {/* Tooltip */}
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
      </div>

      {/* Right Panel for City Data (Hidden initially) */}
      {highlightedCounty && (
        <div className="w-1/4 bg-white shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Data for {highlightedCounty}
          </h2>
          <p className="mt-2 text-gray-600">
            Additional information can go here...
          </p>
        </div>
      )}
    </div>
  );
}

export default Map;
