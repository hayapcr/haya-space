import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/menuData.json";

import Container from "../components/Container";
import SearchFilter from "../components/SearchFilter";
import MenuCard from "../components/MenuCard";

export default function Menu() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredData = data.filter((item) => {

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "" ||
      item.category.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory;

  });

  return (
    <Container>

      <div className="w-full min-h-screen bg-[#F5F5F5] p-4 md:p-6 lg:p-8 font-['Poppins'] relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-orange-300/20 rounded-full blur-[100px] -z-10"></div>

        <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-yellow-200/20 rounded-full blur-[100px] -z-10"></div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">

          {/* TITLE */}
          <div className="space-y-3">

            <div className="flex items-center gap-3">

              <span className="px-4 py-1.5 bg-[#1F2937] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                Catering Menu
              </span>

              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>

              <span className="text-gray-500 text-xs font-medium tracking-widest uppercase">
                Food & Beverage
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#1F2937]">
              Catering{" "}
              <span className="text-orange-500 italic">
                Menu.
              </span>
            </h1>

            <p className="text-gray-500 text-sm">
              Total Menu Available: {filteredData.length}
            </p>

          </div>

          {/* BUTTON */}
          <Link
            to="/dashboard"
            className="w-fit px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Back Dashboard
          </Link>

        </div>

        {/* SEARCH FILTER */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-5 mb-8">

          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

        </div>

        {/* MENU GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

          {filteredData.length > 0 ? (

            filteredData.map((item) => (

              <MenuCard
                key={item.id}
                item={item}
              />

            ))

          ) : (

            <div className="col-span-full bg-white rounded-3xl shadow-md p-10 text-center border">

              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Menu Tidak Ditemukan
              </h2>

              <p className="text-gray-500 text-sm">
                Coba gunakan kata kunci lain atau pilih kategori berbeda.
              </p>

            </div>

          )}

        </div>

      </div>

    </Container>
  );
}