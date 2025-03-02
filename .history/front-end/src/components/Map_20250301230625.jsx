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
  const [highlightedCounties, setHighlightedCounties] = useState({});
  const [tooltipContent, setTooltipContent] = useState(""); // Store tooltip content
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // Position of the tooltip

  // Find counties by city (your original function)
  const findCountiesByCity = (city) => {
    let countiesFound = [];
    for (let county in counties) {
      if (counties[county].includes(city)) {
        countiesFound.push(county);
      }
    }
    return countiesFound;
  };

  // Handle key press (Enter)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const foundCounties = findCountiesByCity(searchTerm);

      if (foundCounties.length > 0) {
        // Highlight the found counties
        const newHighlightedCounties = {};
        foundCounties.forEach((county) => {
          newHighlightedCounties[county] = true; // Mark as highlighted
        });
        setHighlightedCounties(newHighlightedCounties); // Update state with highlighted counties
        console.log(
          `Found and highlighted counties: ${foundCounties.join(", ")}`
        );
      } else {
        console.log("City not found in Florida.");
      }
    }
  };

  // Handle county click (make sure only one county is highlighted)
  const handleCountyClick = (countyName) => {
    setSearchTerm(countyName); // Set the search bar to the county name
    setHighlightedCounties({}); // Unhighlight all counties
    setHighlightedCounties((prevState) => ({
      [countyName]: true, // Highlight only the clicked county
    }));
  };

  // Handle mouse enter (show tooltip)
  const handleMouseEnter = (event, countyName) => {
    const mapElement = event.target.closest(".map-container"); // Find the map container
    const { left, top } = mapElement.getBoundingClientRect();
    const { clientX, clientY } = event;

    // Adjust tooltip position based on mouse position and map container position
    setTooltipPosition({
      x: clientX - left - 10, // Offset for tooltip position
      y: clientY - top - 60, // Offset for tooltip position
    });

    setTooltipContent(countyName); // Set county name as tooltip content
  };

  // Handle mouse leave (hide tooltip)
  const handleMouseLeave = () => {
    setTooltipContent(""); // Hide tooltip when mouse leaves the county
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to top right, #589FE0 92%, #5CAEDE 99%)", // Gradient from bottom left to top right
      }}
    >
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">See your Community</h1>
      </div>

      <div className="w-3/5 my-4">
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full p-1 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* Display search results */}
      <div className="my-2 text-lg">
        {searchTerm && <div>{`Searching for: ${searchTerm}`}</div>}
      </div>

      <div className="w-4/5 h-4/5 relative map-container">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 4000,
            center: [-83, 28], // Approximate center of Florida
          }}
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
                    } // Highlight color
                    stroke="#FFFFFF"
                    onClick={() => handleCountyClick(countyName)} // Set search bar value when county is clicked
                    onMouseEnter={(e) => handleMouseEnter(e, countyName)} // Show tooltip on hover
                    onMouseLeave={handleMouseLeave} // Hide tooltip when mouse leaves
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

        {/* Tooltip displayed on hover */}
        {tooltipContent && (
          <div
            className="absolute bg-black text-white p-2 rounded"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              pointerEvents: "none", // Ensures the tooltip doesn't block interactions
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
