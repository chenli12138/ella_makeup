import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NaviBar from "./components/NaviBar";
import RouteTransition from "./RouteTransition";

function App() {
  return (
    <Router>
      <NaviBar />
      <RouteTransition />
    </Router>
  );
}

export default App;
