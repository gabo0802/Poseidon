export default function Header() {
  return (
    <header className="header">
      <div className="w-full h-[138px] relative">
        <div className="w-full h-[138px] left-0 top-0 absolute bg-gradient-to-b from-[#369ed4] to-[#4fdac5]" />
        <div className="w-[1007px] h-[38px] left-[173px] top-[57px] absolute">
          <h3 className="left-[467px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Home
          </h3>
          <h3 className="left-3 bottom-1 text-4xl absolute text-black font-bold font-['Poppins']">
            Poseidon
          </h3>
          <h3 className="left-[639px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Description
          </h3>
          <h3 className="left-[872px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Flood Map
          </h3>
        </div>
        <div className="w-[70px] h-[70px] left-[94px] top-[35px] absolute flex items-center justify-center">
          <div className="w-[90px] h-[90px] bg-black opacity-90 rounded-full absolute"></div>
          <img
            className="w-[80px] h-[80px] relative bottom-[2px]"
            src="src/assets/presidon-logo.png"
          />
        </div>
      </div>
    </header>
  );
}
