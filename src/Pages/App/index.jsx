import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";
import Home from "../Home";
import MyAccount from "../MyAccount";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Navbar from "../../Components/Navbar";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";
import ProtectedRoute from "../../Components/ProtectedRoute";
import CartSummary from "../../Components/CartSummary";
import "./App.css";
import ManageItems from "../ManageItems";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/gk-gloves", element: <Home /> },
    { path: "/gk-pants", element: <Home /> },
    { path: "/gk-shirts", element: <Home /> },
    { path: "/gk-padded-pants", element: <Home /> },
    { path: "/uniform/jerseys", element: <Home /> },
    { path: "/uniform/shorts", element: <Home /> },
    { path: "/uniform/socks", element: <Home /> },
    { path: "/accessories/bags", element: <Home /> },
    { path: "/accessories/caps", element: <Home /> },
    { path: "/accessories/bottles", element: <Home /> },
    { path: "/soccer-balls", element: <Home /> },
    { path: "/cart-summary", element: <CartSummary /> },
    {
      path: "/my-account",
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ),
    },
    {
      path: "/manage-items",
      element: (
        <ProtectedRoute>
          <ManageItems />
        </ProtectedRoute>
      ),
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
