import { useMemo, useState } from "react";
import {
  FaCrown,
  FaGift,
  FaUsers,
  FaCheckCircle,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload,
  FaTimes,
} from "react-icons/fa";

const generateMembers = () => {
  const names = [
    "Haya Nur Rizky", "Hana Haura", "Syifa", "Awa Salsabila", "Fathiya",
    "Olivia Nugroho", "Joko Rahma", "Budi Pratama", "Andi Nugroho", "Maya Rahma",
    "Indah Pratama", "Ayu Lestari", "Hendra Wijaya", "Siti Saputra", "Rizky Saputra",
    "Citra Pratama", "Dimas Rahma", "Fajar Saputra", "Gina Lestari", "Lukman Wijaya",
  ];

  return Array.from({ length: 120 }, (_, i) => {
    const name = names[i % names.length];
    const tier = i % 3 === 0 ? "VIP Catering" : "Regular";

    return {
      id: `MBR-${String(i + 101).padStart(3, "0")}`,
      name: `${name} ${i + 1}`,
      email: `${name.toLowerCase().replaceAll(" ", "")}${i + 1}@gmail.com`,
      tier,
      joinDate: ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026"][i % 4],
      points: tier === "VIP Catering" ? 800 + i * 10 : 150 + i * 5,
      status: i % 5 === 0 ? "Nonaktif" : "Aktif",
    };
  });
};

export default function Membership() {
  const [members, setMembers] = useState(generateMembers());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    tier: "Regular",
    joinDate: "Jun 2026",
    points: 0,
    status: "Aktif",
  });

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "Semua" ||
        member.tier.toLowerCase().includes(filter.toLowerCase());

      return matchSearch && matchFilter;
    });
  }, [members, search, filter]);

  const vipCount = members.filter((m) => m.tier === "VIP Catering").length;
  const activeCount = members.filter((m) => m.status === "Aktif").length;
  const totalPoints = members.reduce((total, item) => total + Number(item.points), 0);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      tier: "Regular",
      joinDate: "Jun 2026",
      points: 0,
      status: "Aktif",
    });
    setEditId(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (member) => {
    setForm(member);
    setEditId(member.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus data member ini?");
    if (!confirmDelete) return;

    setMembers(members.filter((member) => member.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setMembers(
        members.map((member) =>
          member.id === editId ? { ...form, id: editId } : member
        )
      );
    } else {
      const newMember = {
        ...form,
        id: `MBR-${String(members.length + 101).padStart(3, "0")}`,
        points: Number(form.points),
      };

      setMembers([newMember, ...members]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const downloadCSV = () => {
    const header = "ID,Nama,Email,Tier,Tanggal Daftar,Poin,Status\n";
    const rows = members
      .map(
        (m) =>
          `${m.id},${m.name},${m.email},${m.tier},${m.joinDate},${m.points},${m.status}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "membership-catering.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-['Poppins'] min-h-screen bg-slate-50/50 text-slate-800">
      <div className="border-b border-slate-200 pb-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-5 py-2 bg-[#0F1B3D] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
            CRM & LOYALTY
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            MEMBERSHIP CATERING
          </span>
        </div>

        <h1 className="text-[64px] font-black leading-none text-[#0F1B3D]">
          Membership <span className="italic text-[#F8B602]">Rewards.</span>
        </h1>

        <p className="mt-5 text-gray-500 text-sm font-medium max-w-2xl">
          Mengelola program loyalitas customer catering, poin reward, dan status membership pelanggan.
        </p>
      </div>

      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={downloadCSV}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-[#0F1B3D]"
        >
          <FaDownload className="inline mr-2" />
          Download Laporan
        </button>

        <button
          onClick={handleAdd}
          className="rounded-2xl bg-[#F8B602] px-5 py-3 text-xs font-bold text-white"
        >
          <FaPlus className="inline mr-2" />
          Tambah Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <SummaryCard icon={<FaUsers />} title="Total Member" value={members.length} />
        <SummaryCard icon={<FaCrown />} title="VIP Member" value={vipCount} />
        <SummaryCard icon={<FaGift />} title="Total Points" value={totalPoints.toLocaleString("id-ID")} />
        <SummaryCard icon={<FaCheckCircle />} title="Member Aktif" value={activeCount} />
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/40 border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-[420px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            placeholder="Cari nama, email, atau ID member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#F8B602]"
          />
        </div>

        <div className="flex gap-3">
          {["Semua", "Regular", "VIP"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-2xl px-5 py-3 text-xs font-bold ${
                filter === item
                  ? "bg-[#0F1B3D] text-white"
                  : "border border-slate-200 text-slate-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                {member.id}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  member.tier.includes("VIP")
                    ? "bg-[#FFF8E1] text-[#F8B602] border border-[#F8B602]/30"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {member.tier}
              </span>
            </div>

            <h3 className="text-xl font-black text-[#0F1B3D]">{member.name}</h3>
            <p className="text-sm text-slate-400 mt-1">{member.email}</p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Sejak</p>
                <p className="text-sm font-bold text-slate-700">{member.joinDate}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Poin</p>
                <p className="text-sm font-bold text-[#F8B602]">{member.points} PTS</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {member.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => handleEdit(member)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(member.id)}
                  className="rounded-xl border border-red-100 px-3 py-2 text-xs font-bold text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <Modal title="Detail Member" onClose={() => setSelectedMember(null)}>
          <p><b>ID:</b> {selectedMember.id}</p>
          <p><b>Nama:</b> {selectedMember.name}</p>
          <p><b>Email:</b> {selectedMember.email}</p>
          <p><b>Tier:</b> {selectedMember.tier}</p>
          <p><b>Poin:</b> {selectedMember.points}</p>
          <p><b>Status:</b> {selectedMember.status}</p>
        </Modal>
      )}

      {isFormOpen && (
        <Modal title={editId ? "Edit Member" : "Tambah Member"} onClose={() => setIsFormOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama member"
              required
              className="w-full rounded-xl border p-3 text-sm"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
              className="w-full rounded-xl border p-3 text-sm"
            />

            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
              className="w-full rounded-xl border p-3 text-sm"
            >
              <option>Regular</option>
              <option>VIP Catering</option>
            </select>

            <input
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: e.target.value })}
              placeholder="Poin"
              className="w-full rounded-xl border p-3 text-sm"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl border p-3 text-sm"
            >
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>

            <button className="w-full rounded-xl bg-[#F8B602] py-3 text-sm font-bold text-white">
              Simpan Data
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100">
      <div className="text-[#F8B602] text-2xl mb-4">{icon}</div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{title}</p>
      <h2 className="text-2xl font-black text-[#0F1B3D]">{value}</h2>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#0F1B3D]">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-3 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}