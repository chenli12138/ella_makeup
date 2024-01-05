import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NaviBar from "./components/NaviBar";
import RouteTransition from "./RouteTransition";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NaviBar />
      <div className="pt-[10vh] sm:pt-0"> </div>
      <RouteTransition />
      <Footer />
    </Router>
  );
}

export default App;
