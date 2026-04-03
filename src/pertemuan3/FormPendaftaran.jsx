import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function FormPendaftaran() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [umur, setUmur] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [kelas, setKelas] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!nama) newErrors.nama = "Nama wajib diisi";
    else if (/\d/.test(nama))
      newErrors.nama = "Nama tidak boleh angka";

    if (!email) newErrors.email = "Email wajib diisi";
    else if (!email.includes("@"))
      newErrors.email = "Email harus ada @";

    if (!umur) newErrors.umur = "Umur wajib diisi";
    else if (isNaN(umur) || umur <= 0)
        newErrors.umur = "Umur harus angka positif";

    if (!jurusan)
      newErrors.jurusan = "Jurusan wajib dipilih";

    if (!kelas)
      newErrors.kelas = "Kelas wajib dipilih";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    }
  };

  const isValid =
    nama &&
    !/\d/.test(nama) &&
    email.includes("@") &&
    umur &&
    !isNaN(umur) &&
    jurusan &&
    kelas;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
          Form Pendaftaran
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Silakan isi data pendaftaran mahasiswa
        </p>

        <InputField
          label="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          error={errors.nama}
        />

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          error={errors.umur}
        />

        <SelectField
          label="Jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          options={["Sistem Informasi", "Teknik Informatika", "Teknik Rekayasa Komputer"]}
          error={errors.jurusan}
        />

        <SelectField
          label="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          options={["A", "B", "C", "D", "E"]}
          error={errors.kelas}
        />

        {isValid && (
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition duration-300"
          >
            Submit
          </button>
        )}

        {submitted && (
          <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-xl shadow">
            <h2 className="font-bold text-green-700 mb-2">
              Data Berhasil Disimpan
            </h2>
            <p><b>Nama:</b> {nama}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Umur:</b> {umur}</p>
            <p><b>Jurusan:</b> {jurusan}</p>
            <p><b>Kelas:</b> {kelas}</p>
          </div>
        )}
      </div>
    </div>
             );
}
