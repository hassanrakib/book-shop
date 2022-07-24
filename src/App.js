import { Routes } from "react-router-dom";
import { Route } from "react-router";
import AuthProvider from "./contexts/AuthProvider";
import Home from "./Pages/Home/Home/Home";
import Checkout from "./Pages/Checkout/Checkout/Checkout";
import MainLayout from "./Pages/PageLayouts/MainLayout/MainLayout";
import Login from "./Pages/Login/Login/Login";
import CreateAccount from "./Pages/CreateAccount/CreateAccount/CreateAccount";
import CartProvider from "./contexts/CartProvider";
import RequireAuth from "./Pages/Shared/RequireAuth/RequireAuth";
import Order from "./Pages/Order/Order/Order";
import DashboardLayout from "./Pages/PageLayouts/DashboardLayout/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/order"
              element={
                <RequireAuth>
                  <Order />
                </RequireAuth>
              }
            />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
