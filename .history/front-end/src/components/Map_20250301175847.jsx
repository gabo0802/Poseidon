import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "./florida-counties.json";

const citiesInCounties = {
  Miami: ["Miami-Dade"],
  Orlando: ["Orange", "Osceola"],
  Tampa: ["Hillsborough"],
  Jacksonville: ["Duval"],
  "St. Petersburg": ["Pinellas"],
  Hialeah: ["Miami-Dade"],
  "Fort Lauderdale": ["Broward"],
  "Port St. Lucie": ["St. Lucie"],
  Tallahassee: ["Leon"],
  "Cape Coral": ["Lee"],
  "Fort Myers": ["Lee"],
  Gainesville: ["Alachua"],
  "Pembroke Pines": ["Broward"],
  Hollywood: ["Broward"],
  Miramar: ["Broward"],
  "Coral Springs": ["Broward"],
  Clearwater: ["Pinellas"],
  "Miami Beach": ["Miami-Dade"],
  "West Palm Beach": ["Palm Beach"],
  "Pompano Beach": ["Broward"],
  Lakeland: ["Polk"],
  "Palm Bay": ["Brevard"],
  Davie: ["Broward"],
  "Boca Raton": ["Palm Beach"],
  Sunrise: ["Broward"],
  "Miami Gardens": ["Miami-Dade"],
  Melbourne: ["Brevard"],
  Largo: ["Pinellas"],
  "Delray Beach": ["Palm Beach"],
  Brandon: ["Hillsborough"],
  Ocala: ["Marion"],
  Aventura: ["Miami-Dade"],
  "Winter Haven": ["Polk"],
  Doral: ["Miami-Dade"],
  Kissimmee: ["Osceola"],
  Plantation: ["Broward"],
  "Winter Park": ["Orange"],
  "The Villages": ["Sumter"],
  "Palm Coast": ["Flagler"],
  Wellington: ["Palm Beach"],
  "Hallandale Beach": ["Broward"],
  "North Miami": ["Miami-Dade"],
  Sarasota: ["Sarasota"],
  "Saint Augustine": ["St. Johns"],
  Bradenton: ["Manatee"],
  Titusville: ["Brevard"],
  "Boynton Beach": ["Palm Beach"],
  Gulfport: ["Pinellas"],
  Venice: ["Sarasota"],
  "North Port": ["Sarasota"],
  Wauchula: ["Hardee"],
  Bunnell: ["Flagler"],
  "Lake Worth Beach": ["Palm Beach"],
  "Indian Harbour Beach": ["Brevard"],
  "Jacksonville Beach": ["Duval"],
  "Satellite Beach": ["Brevard"],
  Seffner: ["Hillsborough"],
  "Merritt Island": ["Brevard"],
  "Clearwater Beach": ["Pinellas"],
  "Beverly Hills": ["Citrus"],
  Cocoa: ["Brevard"],
  Sebring: ["Highlands"],
  "Fort Pierce": ["St. Lucie"],
  "Palm Springs": ["Palm Beach"],
  Loxahatchee: ["Palm Beach"],
  "Coconut Creek": ["Broward"],
  "Riviera Beach": ["Palm Beach"],
  Leesburg: ["Lake"],
  "Palm Beach Gardens": ["Palm Beach"],
  Tamarac: ["Broward"],
  Maitland: ["Orange"],
  "New Smyrna Beach": ["Volusia"],
  Pinecrest: ["Miami-Dade"],
  Crestview: ["Okaloosa"],
  Lauderhill: ["Broward"],
  Homestead: ["Miami-Dade"],
  "Lake Mary": ["Seminole"],
  "Fort Walton Beach": ["Okaloosa"],
  Parkland: ["Broward"],
  "Coconut Grove": ["Miami-Dade"],
  "Indian River Shores": ["Indian River"],
  Pahokee: ["Palm Beach"],
  Ocoee: ["Orange"],
  "Gulf Breeze": ["Santa Rosa"],
  "Saint Petersburg": ["Pinellas"],
  "Vero Beach": ["Indian River"],
};

function Map() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold">See your Community</h1>
        </div>
        <div className="w-3/5 my-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-1 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleInputChange}
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
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E5F7"
                    stroke="#FFFFFF" // Optional stroke for borders
                    tabIndex={-1} // Ensure the geography is not focusable (non-interactive)
                    style={{
                      default: {
                        outline: "none", // Remove outline for default state
                      },
                      hover: {
                        outline: "none", // Remove outline for hover state
                        fill: "blue", // Change color on hover
                      },
                      pressed: {
                        outline: "none", // Remove outline for pressed state
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </>
  );
}

export default Map;
