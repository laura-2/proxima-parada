import React, { useContext } from "react";
import Header from "../components/Header";
import Card from "../components/Card"
import { AuthContext } from "../context/auth";
function Favoritos() {
  const {user, favList} = useContext(AuthContext)
  const fav = user.favList && favList
  return (<>
  <Header/>
  <div className="bg-blue-950 py-5">
    {user && user.favList.length > 1 ? fav?.map((fav, index) => {
            return <Card {...fav} key={index} />
        }) : <p className="text-white text-center text-xl px-1">Você não adicionou nenhuma viagem aos favoritos!</p>
         }
    </div>
    </>
  );
}

export default Favoritos;
