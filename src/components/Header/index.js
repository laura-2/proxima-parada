import logo from "../../assets/viagem.png";
import favoritos from "../../assets/fav.svg";
import perfil from "../../assets/perfil.svg";
import menu from "../../assets/menu-aberto.png";
import fechar from "../../assets/remover.png";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const listItens = [
  { nomeEN: "Americas", nomePT: "AMÉRICA" },
  { nomeEN: "Europe", nomePT: "EUROPA" },
  { nomeEN: "Asia", nomePT: "ÁSIA" },
  { nomeEN: "Africa", nomePT: "ÁFRICA" },
  { nomeEN: "Oceania", nomePT: "OCEANIA" },
  { nomeEN: "Polar", nomePT: "ANTÁRTIDA" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useContext(AuthContext)
  
  function handleOpenMenu(){
    setMenuOpen(!menuOpen)
}
  return (
    <header className="flex justify-between items-center bg-white py-1 px-5">
      <Link to="/">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <p>
            <strong className="text-amber-500 uppercase text-xl">Próxima Parada</strong>
          </p>
        </div>
      </Link>
      <div className="hidden lg:flex gap-2">
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
      <div className="hidden lg:flex gap-2 items-center">
        <Link to="/favoritos" className="flex gap-2 text-base text-blue-950">
          <img src={favoritos} alt="Logo" />
        </Link>
        <Link to={user.email ? '/perfil/signout' : "/perfil/cadastro"} className="flex text-base text-blue-950">
          {user.email ? <p className="text-base">{user.email}</p> : <img src={perfil} alt="Logo" />}
        </Link>
      </div>
      <img src={menuOpen ? fechar : menu} onClick={handleOpenMenu} alt="Menu" className="lg:hidden"/>
      <div className={!menuOpen ? "hidden" : "block absolute top-14 bg-white p-2 right-0 w-auto z-10 lg:hidden"}>
        <Link to={user.email ? '/perfil/signout' : "/perfil/cadastro"} className="text-blue-950 text-xl">
          {user.email ? <p>{user.email}</p> : <p>Perfil</p>}
        </Link>
        <Link to="/favoritos" className="text-xl text-blue-950">
        Favoritos
        </Link>
      {listItens.map((item) => {
        return (
          <Link
            to={`/continente/${item.nomeEN}`}
            key={item.nomePT}
            className="text-xl text-blue-950"
          >
            <li key={item}>{item.nomePT}</li>
          </Link>
        );
      })}
    </div>
    </header>
  );
}
