import Landing1 from "./Landing";
import AboutUs from "./AboutUs";
import Products from "./Products";
import Places from "./Places";
import Events from "./Events";
import News from "./News";
import Footer from "./Footer";
import Preloader from "../../components/Preloader";
import ProductPopup from "./ProductPopup";

const HomePage = () => {
  return (
    <>
      <Preloader />
      <ProductPopup />
      <Landing1 />
      <AboutUs />
      <Products />
      <Places />
      <Events />
      <News />
      <Footer />
    </>
  );
};

export default HomePage;
