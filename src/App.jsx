import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Menu = lazy(() => import("./pages/Menu"));
const Cart = lazy(() => import("./pages/Cart"));
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const MenuDetail = lazy(() => import("./pages/MenuDetail"));
const OrdersDetail = lazy(() => import("./pages/OrdersDetail"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const PasswordChanged = lazy(() => import("./pages/auth/PasswordChanged"));
const Users = lazy(() => import("./pages/Users"));
const CampaignPromo = lazy(() => import("./pages/CampaignPromo"));

function App() {
  return (
    <BrowserRouter>

      {/* ✅ SUSPENSE GLOBAL */}
      <Suspense fallback={<Loading />}>

        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu/:id" element={<MenuDetail />} />
            <Route path="orders/:id" element={<OrdersDetail />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
            <Route path="campaign-promo" element={<CampaignPromo />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-changed" element={<PasswordChanged />} />
          </Route>

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;