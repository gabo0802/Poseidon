export default function Footer() {
  return (
    <footer className="footer">
      <div className="w-full h-[138px] relative">
        <div className="w-full h-[138px] left-0 top-0 absolute bg-gradient-to-b from-[#59A0E0] to-[#4fdac5]" />
        <div className="w-[1007px] h-[38px] left-[173px] top-[57px] absolute">
          <p className="right-0 text-sm absolute text-black font-bold font-['Poppins']">
            Copyright® Gabriel Castejon, et all
          </p>
        </div>
        <img
          className="w-[70px] h-[70px] left-[94px] top-[31px] absolute"
          src="src/assets/trident_3.png"
        />
      </div>
    </footer>
  );
}
