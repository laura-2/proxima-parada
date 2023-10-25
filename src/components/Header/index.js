import logo from "../../assets/viagem.png";
import favoritos from "../../assets/fav.svg";
import React from "react";
import { Link } from "react-router-dom";

const listItens = [
  { nomeEN: "Americas", nomePT: "AMÉRICA" },
  { nomeEN: "Europe", nomePT: "EUROPA" },
  { nomeEN: "Asia", nomePT: "ÁSIA" },
  { nomeEN: "Africa", nomePT: "ÁFRICA" },
  { nomeEN: "Oceania", nomePT: "OCEANIA" },
  { nomeEN: "Polar", nomePT: "ANTÁRTIDA" },
];

export default function Header() {


  return (
    <header className="flex justify-around items-center bg-white gap-2 py-1 px-8">
      <Link to="/">
        <div className="flex gap-2">
          <img src={logo} alt="Logo" className="w-1/12 h-3/4" />
          <p className="text-2xl text-amber-500 uppercase mt-4">
            <strong>Próxima Parada</strong>
          </p>
        </div>
      </Link>
      <div className="flex gap-2">
        {listItens.map((item) => {
          return (
            <Link
              to={`/continente/${item.nomeEN}`}
              key={item.nomePT}
              className="text-base text-blue-950"
            >
              <li key={item}>{item.nomePT}</li>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Link to="/favoritos" className="flex gap-2 text-base text-blue-950">
          <img src={favoritos} alt="Logo" />
        </Link>
      </div>
    </header>
  );
}
