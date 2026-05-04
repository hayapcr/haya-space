import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold">
            Catering<span className="text-green-500">Ku</span>
          </h1>
        </div>

        {/* CHILD ROUTE */}
        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Catering Dashboard
        </p>

      </div>
    </div>
  );
}