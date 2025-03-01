
import backgroundImage from '../../public/background-img.jpg'; // Correctly import image

function LandingPage() {
    return (
        <div 
            className="box-border bg-opacity-90 bg-cover bg-center bg-no-repeat min-h-screen margin-0 padding-0"
            style={{ backgroundImage: `url(${backgroundImage})` }} 
        >
            <div className="flex justify-center t-20 h-screen">
            <div className="text-white text-4xl font-bold">
                Welcome to Presidon
            </div>
            </div>
        </div>
        );
}

export default LandingPage;
