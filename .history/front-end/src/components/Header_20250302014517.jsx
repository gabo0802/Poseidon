export default function Header() {
  return (
    <header className="header">
      <div className="w-full h-[138px] relative">
        {/* Gradient background */}
        <div className="w-full h-[138px] absolute bg-gradient-to-b from-[#369ed4] to-[#4fdac5]" />

        {/* Main container to hold logo and text */}
        <div className="w-full h-full flex items-center justify-between px-4">
          {/* Left side with logo and "Poseidon" */}
          <div className="flex items-center space-x-3">
            <div className="w-[70px] h-[70px] flex items-center justify-center relative">
              <div className="w-[90px] h-[90px] bg-gradient-to-r from-[#ff5202] to-[#ff8f5c] opacity-90 rounded-full absolute"></div>
              <img
                className="w-[80px] h-[80px] relative bottom-[2px]"
                src="src/assets/trident_3.png"
                alt="Trident Logo"
              />
            </div>
            <h3 className="text-4xl text-black font-bold font-['Poppins']">
              Poseidon
            </h3>
          </div>

          {/* Right side with "Description" and "Flood Map" */}
          <div className="flex items-center space-x-8">
            <h3 className="text-black font-bold font-['Poppins'] hover:underline hover:cursor-pointer hover:scale-105 transition-transform">
              Description
            </h3>
            <h3 className="text-black font-bold font-['Poppins'] hover:underline hover:cursor-pointer hover:scale-105 transition-transform">
              Flood Map
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
