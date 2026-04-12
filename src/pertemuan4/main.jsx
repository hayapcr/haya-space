import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./tailwind.css";
import TravelList from "./TravelList";
import TravelListSearchFilter from "./TravelListSearchFilter";

function App() {
  const [role, setRole] = useState("guest");

  return (
    <div>
      <div className="p-4 text-center">
        <button
          onClick={() => setRole("guest")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Guest
        </button>

        <button
          onClick={() => setRole("admin")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Admin
        </button>
      </div>

      {role === "guest" ? <TravelList /> : <TravelListSearchFilter />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);