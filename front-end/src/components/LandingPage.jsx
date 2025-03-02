
import backgroundImage from '../../public/background-img.jpg'; // Correctly import image

function LandingPage() {
    return (
        <div>
        <div 
            className="box-border bg-opacity-90 bg-cover bg-center bg-no-repeat min-h-screen margin-0 padding-0"
            style={{ backgroundImage: `url(${backgroundImage})` }} 
        >
            <div className="flex justify-center -translate-y-[8em] h-screen">
            <div className="flex flex-col justify-center items-center">
            <div className="text-8xl font-bold text-black">
                Presidon
            </div>
            <div className="text-4xl font-bold text-black">
                Florida's Flood Risk Management Platform
            </div>
            <br></br>
            <br></br>
            <div>test div</div>
            </div>
            </div>
            </div>
        </div>
        );
}

export default LandingPage;
