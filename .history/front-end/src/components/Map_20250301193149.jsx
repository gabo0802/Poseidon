import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "./florida-counties.json";

const counties = {
  "Alachua County": [
    "Gainesville",
    "Alachua",
    "High Springs",
    "Newberry",
    "Waldo",
  ],
  "Baker County": ["Macclenny", "Glen St. Mary", "Sanderson", "Olustee"],
  "Bay County": [
    "Panama City",
    "Lynn Haven",
    "Callaway",
    "Parker",
    "Mexico Beach",
  ],
  "Bradford County": ["Starke", "Lawtey", "Hampton", "Brooker"],
  "Brevard County": [
    "Cocoa",
    "Melbourne",
    "Palm Bay",
    "Titusville",
    "Rockledge",
  ],
  "Broward County": [
    "Fort Lauderdale",
    "Hollywood",
    "Pembroke Pines",
    "Miramar",
    "Pompano Beach",
    "Coral Springs",
    "Davie",
  ],
  "Calhoun County": ["Blountstown", "Altha"],
  "Charlotte County": ["Punta Gorda", "Port Charlotte", "Englewood"],
  "Citrus County": ["Inverness", "Crystal River", "Homosassa", "Lecanto"],
  "Clay County": ["Green Cove Springs", "Orange Park", "Fleming Island"],
  "Collier County": ["Naples", "Marco Island", "Immokalee"],
  "Columbia County": ["Lake City", "Fort White", "White Springs"],
  "DeSoto County": ["Arcadia", "Nocatee", "Astatula"],
  "Dixie County": ["Cross City", "Old Town", "Suwannee"],
  "Duval County": [
    "Jacksonville",
    "Atlantic Beach",
    "Neptune Beach",
    "Jacksonville Beach",
  ],
  "Escambia County": ["Pensacola", "Perdido Key", "Ensley", "McDavid"],
  "Flagler County": ["Palm Coast", "Bunnell", "Flagler Beach"],
  "Franklin County": [
    "Apalachicola",
    "Carrabelle",
    "Eastpoint",
    "St. George Island",
  ],
  "Gadsden County": ["Quincy", "Chattahoochee", "Havana"],
  "Gilchrist County": ["Trenton", "Fanning Springs", "Bell"],
  "Glades County": ["Moore Haven", "Palmdale"],
  "Gulf County": ["Port St. Joe", "Wewahitchka", "St. Joe Beach"],
  "Hamilton County": ["Jasper", "White Springs", "Jennings"],
  "Hardee County": ["Wauchula", "Bowling Green", "Zolfo Springs"],
  "Hendry County": ["LaBelle", "Clewiston", "Immokalee"],
  "Hernando County": ["Brooksville", "Spring Hill", "Weeki Wachee"],
  "Highlands County": ["Sebring", "Lake Placid", "Avon Park"],
  "Hillsborough County": [
    "Tampa",
    "Brandon",
    "Temple Terrace",
    "Plant City",
    "Ruskin",
  ],
  "Holmes County": ["Bonifay", "Ponce de Leon", "Westville"],
  "Indian River County": ["Vero Beach", "Sebastian", "Fellsmere"],
  "Jackson County": ["Marianna", "Graceville", "Cottondale", "Sneads"],
  "Jefferson County": ["Monticello", "Aucilla"],
  "Lafayette County": ["Mayo", "Jena"],
  "Lake County": ["Tavares", "Leesburg", "Eustis", "Clermont", "Mount Dora"],
  "Lee County": [
    "Fort Myers",
    "Cape Coral",
    "Lehigh Acres",
    "Bonita Springs",
    "Sanibel",
    "Estero",
  ],
  "Leon County": ["Tallahassee", "Crawfordville", "Woodville", "Havana"],
  "Levy County": ["Bronson", "Williston", "Chiefland", "Morriston"],
  "Liberty County": ["Bristol", "Hosford"],
  "Madison County": ["Madison", "Greenville", "Cherry Lake"],
  "Manatee County": ["Bradenton", "Palmetto", "Lakewood Ranch", "Anna Maria"],
  "Marion County": ["Ocala", "Belleview", "Dunnellon", "Citra"],
  "Martin County": ["Stuart", "Jensen Beach", "Palm City", "Hobe Sound"],
  "Miami-Dade County": [
    "Miami",
    "Hialeah",
    "Miami Beach",
    "Homestead",
    "Coral Gables",
    "Aventura",
    "Doral",
    "North Miami",
  ],
  "Monroe County": ["Key West", "Marathon", "Tavernier", "Islamorada"],
  "Nassau County": ["Fernandina Beach", "Yulee", "Callahan"],
  "Okaloosa County": [
    "Fort Walton Beach",
    "Destin",
    "Niceville",
    "Crestview",
    "Valparaiso",
  ],
  "Okeechobee County": ["Okeechobee", "Basswood", "Basinger"],
  "Orange County": [
    "Orlando",
    "Winter Park",
    "Apopka",
    "Ocoee",
    "Maitland",
    "Lake Buena Vista",
  ],
  "Osceola County": ["Kissimmee", "St. Cloud", "Poinciana", "Harmony"],
  "Palm Beach County": [
    "West Palm Beach",
    "Boca Raton",
    "Delray Beach",
    "Lake Worth",
    "Jupiter",
    "Boynton Beach",
    "Palm Springs",
  ],
  "Pasco County": [
    "New Port Richey",
    "Dade City",
    "Zephyrhills",
    "Hudson",
    "Port Richey",
  ],
  "Pinellas County": [
    "St. Petersburg",
    "Clearwater",
    "Pinellas Park",
    "Dunedin",
    "Largo",
    "Palm Harbor",
  ],
  "Polk County": [
    "Lakeland",
    "Winter Haven",
    "Bartow",
    "Lake Wales",
    "Auburndale",
    "Mulberry",
    "Haines City",
  ],
  "Putnam County": ["Palatka", "Crescent City", "Interlachen", "East Palatka"],
  "St. Johns County": ["St. Augustine", "Ponte Vedra Beach", "Elkton"],
  "St. Lucie County": ["Fort Pierce", "Port St. Lucie", "Tradition"],
  "Santa Rosa County": ["Milton", "Gulf Breeze", "Pace", "Jay"],
  "Sarasota County": [
    "Sarasota",
    "Venice",
    "North Port",
    "Osprey",
    "Englewood",
  ],
  "Seminole County": [
    "Sanford",
    "Altamonte Springs",
    "Casselberry",
    "Longwood",
    "Lake Mary",
    "Winter Springs",
  ],
  "Sumter County": ["Bushnell", "Wildwood", "The Villages"],
  "Taylor County": ["Perry", "Shady Grove", "Steinhatchee"],
  "Union County": ["Lake Butler"],
  "Volusia County": [
    "Daytona Beach",
    "Deltona",
    "Ormond Beach",
    "New Smyrna Beach",
    "Edgewater",
  ],
  "Wakulla County": ["Crawfordville", "Panacea", "St. Marks"],
  "Walton County": [
    "DeFuniak Springs",
    "Santa Rosa Beach",
    "Freeport",
    "Miramar Beach",
  ],
  "Washington County": ["Chipley", "Wausau", "Vernon"],
};

const Map = () => {
  const [highlightedCounty, setHighlightedCounty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounties, setSelectedCounties] = useState(new Set());

  // Handle county click
  const handleCountyClick = (geo) => {
    const countyName = geo.properties.county;
    setHighlightedCounty(countyName); // Highlight the clicked county
  };

  // Find county from city name (hardcoded mapping)
  const findCountyByCity = (city) => {
    return counties[city] || null; // Returns the county name or null if not found
  };

  // Handle search input and county highlight
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const countyName = findCountyByCity(searchTerm);
      if (countyName) {
        setSelectedCounties(
          (prevSelected) => new Set([...prevSelected, countyName])
        );
        setHighlightedCounty(countyName); // Highlight the county on search
      } else {
        console.log("City not found in the map.");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
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

      <div className="w-4/5 h-4/5">
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
                const countyName = geo.properties.county; // Ensure this matches the correct property

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      highlightedCounty === countyName
                        ? "#FF5733" // Color for highlighted county
                        : selectedCounties.has(countyName)
                        ? "#4CAF50" // Color for selected county
                        : "#D6D6DA" // Default color for other counties
                    }
                    stroke="#FFFFFF"
                    onClick={() => handleCountyClick(geo)}
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
      </div>
    </div>
  );
};

export default Map;
