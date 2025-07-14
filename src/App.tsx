import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./pages/Home/NavBar";

function App() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/AdminPanel";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}

export default App;
