
import backgroundImage from '../../public/background-img.jpg'; // Correctly import image

function LandingPage() {
    return (
        <div>
        <div 
            className="box-border bg-opacity-90 bg-cover bg-center bg-no-repeat min-h-screen margin-0 padding-0"
            style={{ backgroundImage: `url(${backgroundImage})` }} 
        >
            <div className="flex justify-center -translate-y-[0em] h-screen">
            <div className="flex flex-col justify-center items-center">
            <div className="text-8xl font-bold text-black">
                Presidon
            </div>
            <div className="text-4xl font-bold text-black">
                Florida's Flood Risk Management Platform
            </div>
            <br></br>
            <br></br>
            <div className="carousel carousel-center bg-transparent rounded-box max-w-sm space-x-8">
                <div id="item1" className="carousel-item m-5">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                    className="rounded-box" />
                </div>
                <div id="item2" className="carousel-item m-5">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                    className="rounded-box" />
                </div>
                <div id="item3" className="carousel-item m-5">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                    className="rounded-box" />
                </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                </div>
            </div>
            </div>
            </div>
        </div>
        );
}

export default LandingPage;
