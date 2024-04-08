import logo from "../../assets/viagem.png";
import favoritos from "../../assets/fav.svg";
import perfil from "../../assets/perfil.svg";
import menu from "../../assets/menu-aberto.png";
import fechar from "../../assets/remover.png";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import './header.css'

const listItens = [
  { nomeEN: "Americas", nomePT: "AMÉRICA" },
  { nomeEN: "Europe", nomePT: "EUROPA" },
  { nomeEN: "Asia", nomePT: "ÁSIA" },
  { nomeEN: "Africa", nomePT: "ÁFRICA" },
  { nomeEN: "Oceania", nomePT: "OCEANIA" },
  { nomeEN: "Polar", nomePT: "ANTÁRTIDA" },
];

export default function Header() {
  const {user} = useContext(AuthContext)
  const [menuOpen, setMenuOpen]= useState(false);

  function handleOpenMenu(){
    setMenuOpen(!menuOpen)
}
  return (
    <header className="flex justify-around items-center bg-white py-1 px-2 header">
      <Link to="/">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Logo" className="logo" />
          <p>
            <strong className="text-amber-500 uppercase texto-logo">Próxima Parada</strong>
          </p>
        </div>
      </Link>
      <div className="flex gap-2 continentes">
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
      <div className="flex gap-2 icones">
        <Link to="/favoritos" className="flex gap-2 text-base text-blue-950">
          <img src={favoritos} alt="Logo" />
        </Link>
        <Link to={user ? "/perfil/signout" : "/perfil/cadastro"} className="flex gap-2 text-base text-blue-950">
          {user ? <p className="perfil-logo">{user.email}</p> : <img src={perfil} alt="Logo" />}
        </Link>
      </div>
      <img src={menuOpen ? fechar : menu} onClick={handleOpenMenu} alt="Menu" className="menu"/>
      <div className={!menuOpen ? "menu-fechado" : "menu-aberto"}>
        <Link to={user ? "/perfil/signout" : "/perfil/cadastro"} className="text-base text-blue-950">
          {user ? <p className="perfil-logo">{user.email}</p> : <p>Perfil</p>}
        </Link>
        <Link to="/favoritos" className="text-base text-blue-950">
        Favoritos
        </Link>
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
    </header>
  );
}
