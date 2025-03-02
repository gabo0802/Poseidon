export default function Header() {
  return (
    <header className="header">
      <div className="w-full h-[138px] relative">
        <div className="w-full h-[138px] left-0 top-0 absolute bg-gradient-to-b from-[#369ed4] to-[#4fdac5]" />
        <div className="w-[1007px] h-[38px] left-[173px] top-[57px] absolute">
          <h3 className="left-[467px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Home
          </h3>
          <h3 className="left-4 top-0 text-3xl absolute text-black font-bold font-['Poppins']">
            Presidon
          </h3>
          <h3 className="left-[639px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Description
          </h3>
          <h3 className="left-[872px] top-[2px] text-black font-bold absolute font-['Poppins']">
            Flood Map
          </h3>
        </div>
        <div className="w-[70px] h-[70px] left-[94px] top-[31px] absolute flex items-center justify-center">
          <div className="w-[80px] h-[80px] bg-black opacity-90 rounded-full absolute"></div>
          <img
            className="w-[70px] h-[70px] relative"
            src="src/assets/presidon-logo.png"
          />
        </div>
      </div>
    </header>
  );
}
