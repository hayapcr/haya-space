import "../custom.css";
import FotoProfil from "./FotoProfil";
import Nama from "./Nama";
import NIM from "./NIM";
import ProgramStudi from "./ProgramStudi";
import Alamat from "./Alamat";
import Skill from "./Skill";
import About from "./About";

export default function BiodataDiri() {
  return (
    <div className="wrapper">
      <div className="card">
        <h1 className="title">Portofolio Mahasiswa</h1>

        <FotoProfil />
        <Nama />
        <ProgramStudi />
        <Skill />
        <About />
        <NIM />
        <Alamat />
      </div>
    </div>
  );
}