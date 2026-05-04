export default function MenuCard({ item }) {
  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-slate-100">

      {/* IMAGE */}
      <div className="h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="font-bold text-lg group-hover:text-orange-500 transition">
          {item.name}
        </h3>

        <p className="text-sm text-slate-400 mb-3">
          {item.category}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-orange-500 font-bold text-lg">
            Rp {item.price.toLocaleString()}
          </span>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition">
            Order
          </button>
        </div>

      </div>
    </div>
  );
}