import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ProductsDetails from "../pages/Product/ProductsDetails";
import Orders from "../pages/Orders/Orders";
import Dashboard from "../admin/Dashboard";
import Login from "../login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "aboutUS", element: <AboutUs /> },
      { path: "products/:id", element: <ProductsDetails /> },
      { path: "orders", element: <Orders /> },
      { path: "AdminPanel", element: <Dashboard /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default router;
