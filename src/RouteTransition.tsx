import ContactUs from "./components/Contact";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImgDisplay from "./components/ImgDisplay";
import AboutUs from "./components/AboutUs";
import { useEffect } from "react";
import ServicesList from "./components/ServicesList";

function RouteTransition() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Run the effect on location change
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<ImgDisplay />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/price" element={<ServicesList />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default RouteTransition;
