import ContactUs from "./components/Contact";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImgDisplay from "./components/ImgDisplay";

function RouteTransition() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<ImgDisplay />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default RouteTransition;
