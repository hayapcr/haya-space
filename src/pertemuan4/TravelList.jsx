import data from "./TravellingData.json";

export default function TravelList() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
          Explore the <span className="text-blue-600 italic">World.</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Temukan destinasi impian untuk petualangan Anda berikutnya.
        </p>
      </div>

      {/* Grid Card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.destination}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute top-5 left-5 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-2xl text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {item.destination}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    📍 {item.country}
                  </p>
                </div>

                <div className="bg-yellow-50 px-2.5 py-1 rounded-xl flex items-center border border-yellow-100">
                  <span className="text-yellow-500 text-xs mr-1">★</span>
                  <span className="text-xs font-bold text-yellow-700">
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Nested Structure */}
              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <p>
                  <b>Kota:</b> {item.location.city}
                </p>
                <p>
                  <b>Jam:</b> {item.schedule.open} - {item.schedule.close}
                </p>
                <p>
                  <b>Hotel:</b>{" "}
                  {item.facilities.hotel ? "Ada" : "Tidak"}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Mulai dari
                  </p>
                  <p className="text-xl font-black text-slate-900">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>

                <button className="bg-blue-600 hover:bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all">
                  →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}