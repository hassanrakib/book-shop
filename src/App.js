import { Routes } from "react-router-dom";
import { Route } from "react-router";
import AuthProvider from "./contexts/AuthProvider";
import Home from "./Pages/Home/Home/Home";
import Checkout from "./Pages/Checkout/Checkout/Checkout";
import MainLayout from "./Pages/PageLayouts/MainLayout/MainLayout";
import Login from "./Pages/Login/Login/Login";
import CreateAccount from "./Pages/CreateAccount/CreateAccount/CreateAccount";

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
