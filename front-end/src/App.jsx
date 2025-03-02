import Header from "./components/Header";
import Footer from "./components/footer";
import Map from "./components/Map";
import LandingPage from "./components/LandingPage";

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
