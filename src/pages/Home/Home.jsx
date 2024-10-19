import Landing from "./Landing/landing";
import slides from "../../data/landingPage";
import Preloader from "../../component/Preloader";
import About from "./About/about";
import Products from "./Products/products";
import Places from "./Places/places";
import News from "./OurEvents/ourEvent";
import events from "../../data/new";
import OurNews from "./News/ourNew";
import ours from "../../data/ourNews";
import OurFooter from "./Footer/ourFooter";
import Navbar from "./Navbar/Navbar";
import Headroom from "react-headroom";
import { TabTitle } from "../../component/title";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [t] = useTranslation();
  /* -------------------------------------------------------------------------- */
  /*                                    Title                                   */
  /* -------------------------------------------------------------------------- */
  TabTitle(t("title"));
  /* -------------------------------------------------------------------------- */
  /*                                 ScrollToTop                                */
  /* -------------------------------------------------------------------------- */
  const top = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Preloader />
      <div className="headroom-container">
        <Headroom disableInlineStyles>
          <Navbar />
        </Headroom>
      </div>
      <Landing slides={slides} />
      <About />
      <Products />
      <Places />
      <News events={events} />
      <OurNews ours={ours} />
      <OurFooter />
      <div onClick={top} className="scrollToTop">
        <img src={require("../../assest/image/scrollToTop.png")} alt="" />
      </div>
    </>
  );
};
export default Home;
