import ContactUs from "./pages/Contact";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImgDisplay from "./pages/ImgDisplay";
import AboutUs from "./pages/AboutUs";
import { useEffect } from "react";
import ServicesList from "./pages/ServicesList";
import PicOrder from "./pages/PicOrder";
import LoginPage from "./pages/Login";

function RouteTransition() {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10); // Delay the scroll a bit
  }, [location]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<ImgDisplay />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/price" element={<ServicesList />} />
          <Route path="/pic-order" element={<PicOrder />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default RouteTransition;
