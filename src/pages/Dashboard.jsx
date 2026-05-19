import { useState } from "react";
import data from "../data/menuData.json";

import StatisticCard from "../components/StatisticCard";
import ActivityCard from "../components/ActivityCard";
import Modal from "../components/Modal";
import OrderForm from "../components/OrderForm";
import Container from "../components/Container";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);

  const totalMenu = data.length;

  const totalRevenue = data.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <Container>
      <div className="w-full min-h-screen bg-[#F5F5F5] p-4 md:p-6 lg:p-8 font-['Poppins'] text-[#1F2937] relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#F8B602]/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#FFCC00]/20 rounded-full blur-[100px] -z-10"></div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">

          {/* LEFT */}
          <div className="space-y-3">

            <div className="flex items-center gap-3">

              <span className="px-4 py-1.5 bg-[#1F2937] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                Admin Panel
              </span>

              <div className="w-1.5 h-1.5 bg-[#D1D5DB] rounded-full"></div>

              <span className="text-[#6B7280] text-xs font-medium tracking-widest uppercase">
                System Overview
              </span>

            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2937] leading-[0.9]">
              Main{" "}
              <span className="text-[#F8B602] italic font-semibold">
                Control.
              </span>
            </h1>

          </div>

          {/* BUTTON */}
          <div className="flex items-center p-1.5 bg-white rounded-[2rem] shadow-lg border border-[#F3F4F6] w-fit">

            <button
              onClick={() => setOpenForm(true)}
              className="px-6 py-3 bg-[#F8B602] text-white rounded-[1.5rem] text-xs font-semibold uppercase tracking-widest hover:bg-[#FFCC00] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              + Pesanan Baru
            </button>

          </div>

        </div>

        {/* STATISTIC CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

          {[
            {
              label: "Menu List",
              value: totalMenu,
              color: "text-[#F8B602]",
            },
            {
              label: "Total Revenue",
              value: `Rp ${totalRevenue.toLocaleString()}`,
              color: "text-[#1F2937]",
            },
            {
              label: "Daily Orders",
              value: "120",
              color: "text-[#22C55E]",
            },
          ].map((stat, i) => (

            <StatisticCard
              key={i}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />

          ))}

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 items-start w-full">

          {/* REVENUE */}
          <div className="w-full bg-[#1F2937] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8B602]/20 rounded-full blur-[80px]"></div>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-10 relative z-10">

              <h2 className="text-2xl font-bold tracking-tight">
                Revenue Insights
              </h2>

              <div className="flex items-center gap-2">

                <div className="w-2 h-2 bg-[#F8B602] rounded-full animate-ping"></div>

                <span className="text-[10px] font-medium text-[#D1D5DB] uppercase tracking-widest">
                  Live Data
                </span>

              </div>

            </div>

            {/* CHART */}
            <div className="flex items-end justify-between gap-4 h-72 relative z-10">

              {[30, 60, 45, 90, 55, 80, 100].map((h, i) => (

                <div key={i} className="flex-1 group">

                  <div
                    className="bg-[#374151] group-hover:bg-[#F8B602] transition-all duration-500 rounded-2xl relative overflow-hidden"
                    style={{ height: `${h}%` }}
                  >

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  </div>

                  <p className="text-[10px] font-semibold text-center mt-3 text-[#9CA3AF] uppercase tracking-wider group-hover:text-white transition-colors">
                    W-{i + 1}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* RECENT ACTIVITY */}
          <div className="w-full space-y-5">

            {/* TITLE */}
            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold tracking-tight">
                Recent Activity
              </h2>

              <span className="text-[10px] font-semibold text-[#F8B602] uppercase cursor-pointer hover:underline">
                View All
              </span>

            </div>

            {/* ACTIVITY LIST */}
            {[
              {
                name: "Andi",
                menu: "Nasi Box Special",
                status: "Done",
                color: "bg-[#22C55E]",
              },
              {
                name: "Siti",
                menu: "Snack Box Premium",
                status: "Pending",
                color: "bg-[#F59E0B]",
              },
              {
                name: "Budi",
                menu: "Coffee Arabica",
                status: "Cancel",
                color: "bg-[#EF4444]",
              },
            ].map((order, i) => (

              <ActivityCard
                key={i}
                order={order}
              />

            ))}

          </div>

        </div>

        {/* MODAL */}
        {openForm && (
          <Modal>
            <OrderForm setOpenForm={setOpenForm} />
          </Modal>
        )}

      </div>
    </Container>
  );
}