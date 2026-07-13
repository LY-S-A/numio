import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import BuyNumber from "./pages/BuyNumber";
import Inbox from "./pages/Inbox";
import FundWallet from "./pages/FundWallet";
import Transactions from "./pages/Transactions";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Appearance from "./pages/Appearance";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Pages */}
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Protected Pages */}
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/buy-number"
              element={<BuyNumber />}
            />

            <Route
              path="/inbox"
              element={<Inbox />}
            />

            <Route
              path="/fund-wallet"
              element={<FundWallet />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/support"
              element={<Support />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/appearance"
              element={<Appearance />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
