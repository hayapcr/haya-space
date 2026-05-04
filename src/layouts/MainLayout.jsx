import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {

  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header
          search={search}
          setSearch={setSearch}
        />

        <div className="p-6">
          <Outlet context={{ search, setSearch }} />
        </div>

      </div>
    </div>
  );
}