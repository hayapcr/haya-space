import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data/menuData.json";

import Container from "../components/Container";
import SearchFilter from "../components/SearchFilter";
import MenuCard from "../components/MenuCard";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Icon components untuk mempercantik UI
const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    console.log("Halaman Menu berhasil dibuka");
  }, []);

  const filteredData = data
    .filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "" ||
        item.category.toLowerCase() === category.toLowerCase();

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return a.category.localeCompare(b.category);
      return 0;
    });

  const paketData = filteredData.filter((item) =>
    item.category.toLowerCase().includes("paket")
  );

  const renderMenuGrid = (menuList) => (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 animate-in fade-in duration-500">
      {menuList.length > 0 ? (
        menuList.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))
      ) : (
        <div className="col-span-full rounded-[2.5rem] border-2 border-dashed border-gray-200 bg-white/50 p-16 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Menu Tidak Ditemukan</h2>
          <p className="text-gray-500">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
        </div>
      )}
    </div>
  );

  return (
    <Container>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#F8F9FA] p-4 font-['Poppins'] md:p-6 lg:p-10">

        {/* BACKGROUND ORNAMENTS */}
        <div className="absolute right-[-10%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-orange-200/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-yellow-100/30 blur-[120px]" />

        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-xl shadow-zinc-200">
                Exclusive Menu
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Premium Catering</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900 md:text-6xl">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Catering</span> <br />
              <span className="italic font-serif font-light text-orange-600">Menu Experience.</span>
            </h1>

            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <p className="text-xs font-bold text-gray-600 uppercase">
                Total {filteredData.length} Items Available
              </p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-orange-600 active:scale-95 shadow-2xl shadow-zinc-200"
          >
            <span>Back to Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>

        {/* REFINED ALERT */}
        <Alert className="mb-10 overflow-hidden rounded-[2rem] border-none bg-white p-0 shadow-xl shadow-gray-200/50">
          <div className="flex flex-col border-l-[6px] border-orange-500 bg-orange-50/30 p-6 md:flex-row md:items-center md:gap-5">
            <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm md:mb-0">
              <InfoIcon />
            </div>
            <div>
              <AlertTitle className="text-lg font-bold text-zinc-800">Eksplorasi Menu Kami</AlertTitle>
              <AlertDescription className="text-sm font-medium leading-relaxed text-gray-500">
                Temukan variasi hidangan lezat. Gunakan filter pencarian untuk mempermudah Anda menemukan paket catering yang sesuai dengan acara Anda.
              </AlertDescription>
            </div>
          </div>
        </Alert>

        {/* SEARCH & FILTER BOX */}
        <div className="mb-10 rounded-[2.5rem] border border-white/60 bg-white/80 p-6 shadow-2xl shadow-gray-200/40 backdrop-blur-md">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />
        </div>
        {/* TABS & SORTING AREA */}
        <Tabs defaultValue="semua" className="w-full">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <TabsList className="h-auto w-fit rounded-[20px] bg-zinc-100 p-1.5 shadow-inner">
              <TabsTrigger
                value="semua"
                className="rounded-[15px] px-8 py-3 text-sm font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md"
              >
                Semua Menu
              </TabsTrigger>
              <TabsTrigger
                value="paket"
                className="rounded-[15px] px-8 py-3 text-sm font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md"
              >
                Menu Paket
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <span className="hidden text-xs font-bold uppercase tracking-widest text-gray-400 sm:block">Sort By</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-12 w-full rounded-2xl border-none bg-white px-6 text-sm font-bold shadow-lg shadow-gray-100 focus:ring-2 focus:ring-orange-500 sm:w-[220px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none p-2 shadow-2xl ring-1 ring-black/5">
                  <SelectItem value="default" className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-600">Default</SelectItem>
                  <SelectItem value="name" className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-600">Nama Menu (A-Z)</SelectItem>
                  <SelectItem value="category" className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-600">Kategori</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="semua" className="mt-0 outline-none">
            {renderMenuGrid(filteredData)}
          </TabsContent>

          <TabsContent value="paket" className="mt-0 outline-none">
            {renderMenuGrid(paketData)}
          </TabsContent>
        </Tabs>

      </div>
    </Container>
  );
}