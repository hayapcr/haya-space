import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import GuestLayout from "./layouts/GuestLayout";
import MemberLayout from "./layouts/MemberLayout";

const Landing = lazy(() => import("./pages/guest/Landing"));
const CompanyProfile = lazy(() => import("./pages/guest/CompanyProfile"));

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
const Membership = lazy(() => import("./pages/Membership"));

const MemberHome = lazy(() => import("./pages/member/MemberHome"));
const MemberOrders = lazy(() => import("./pages/member/MemberOrders"));
const MemberPromo = lazy(() => import("./pages/member/MemberPromo"));

function App() {
  return (
    <BrowserRouter>

      {/* ✅ SUSPENSE GLOBAL */}
      <Suspense fallback={<Loading />}>

        <Routes>

          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path="company-profile" element={<CompanyProfile />} />
          </Route>

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
            <Route path="membership" element={<Membership />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-changed" element={<PasswordChanged />} />
          </Route>

          <Route path="/member" element={<MemberLayout />}>
            <Route index element={<MemberHome />} />
            <Route path="orders" element={<MemberOrders />} />
            <Route path="promo" element={<MemberPromo />} />
          </Route>

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;