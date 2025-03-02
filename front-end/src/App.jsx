import Header from "./components/header";
import Footer from "./components/footer";
import Map from "./components/Map";
import LandingPage from "./components/LandingPage";
import ApiCaller from "./components/ApiCaller";

function App() {
  return (
    <div>
      <Header />
      <LandingPage />
      <Map />
      {/* Uncomment to test API <ApiCaller /> */}

      <Footer />
    </div>
  );
}

export default App;
