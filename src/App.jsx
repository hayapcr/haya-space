import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>

      {/* ✅ SUSPENSE GLOBAL */}
      <Suspense fallback={<Loading />}>

        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu/:id" element={<MenuDetail />} />
            <Route path="orders/:id" element={<OrdersDetail />} />
            <Route path="users" element={<Users />} />
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