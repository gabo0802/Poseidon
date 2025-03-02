export default function Footer() {
  return (
    <footer className="footer">
      <div className="w-full h-[138px] relative">
        <div className="w-full h-[138px] left-0 top-0 absolute bg-gradient-to-b from-[#59A0E0] to-[#4fdac5]" />
        <div className="w-[1007px] h-[38px] left-1/2 transform -translate-x-1/2 bottom-2 absolute">
          <p className="text-center text-sm text-black font-semibold font-['Poppins']">
            © 2025 Gabriel Castejon, Alejandro Gonzalez, Gael Garcia. All rights
            reserved.
          </p>
        </div>
        <div className="w-[90px] h-[90px] left-[89px] bg-gradient-to-r from-[#ff5202] to-[#ff8f5c] opacity-90 rounded-full absolute"></div>
        <img
          className="w-[80px] h-[80px] relative bottom-[-2px] left-[94px]"
          src="src/assets/trident_3.png"
        />
      </div>
    </footer>
  );
}
