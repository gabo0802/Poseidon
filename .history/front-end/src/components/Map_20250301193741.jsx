import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

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
  "Walton County": [
    "DeFuniak Springs",
    "Santa Rosa Beach",
    "Freeport",
    "Miramar Beach",
  ],
  "Washington County": ["Chipley", "Wausau", "Vernon"],
};

function Map() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const findCountiesByCity = (city) => {
    let countiesFound = [];
    for (let county in counties) {
      if (counties[county].includes(city)) {
        countiesFound.push(county);
      }
    }
    return countiesFound;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const foundCounties = findCountiesByCity(searchTerm);
      console.log("THIS SHOULD BE WHERE I CHANGE THE COLOR OF THE MAP");

      console.log(
        foundCounties.length > 0 ? foundCounties : "City not found in Florida."
      );
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

      {/* Display search results */}
      <div className="my-2 text-lg">
        {results.length > 0 && (
          <ul>
            {results.map((county, index) => (
              <li key={index}>{county}</li>
            ))}
          </ul>
        )}
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
                const countyName = geo.properties.county; // Corrected to match your JSON structure

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E5F7"
                    stroke="#FFFFFF"
                    tabIndex={-1}
                    onClick={() => console.log(`Clicked county: ${countyName}`)}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "blue" },
                      pressed: { outline: "none", fill: "red" }, // Optional: change color on click
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
}

export default Map;
