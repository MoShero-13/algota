import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/aboutUs";
import ProductDetail from "./pages/Product/ProductDetail";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/algota/" element={<Home />}></Route>
            <Route path="/algota/about" element={<AboutUs />}></Route>
            <Route
              path="/algota/product/:id"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </div>
        <div className="whatsapp whatsapp-1">
          <a
            href="https://wa.me/+963991199453"
            target="_blank"
            className="whatsapp_float"
          >
            <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
          </a>
        </div>
      </Router>
    </>
  );
}

export default App;
