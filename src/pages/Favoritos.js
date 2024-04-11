import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card"
import { getFavoritos } from "../servicos/favoritos";
import { FavoritosContext } from "../context/Favoritos";
function Favoritos() {
  const {favorites, setFavorites} = useContext(FavoritosContext)
 
    async function fetchFavoritos(){
    const favoritosAPI = await getFavoritos()
    setFavorites(favoritosAPI)
    }

    useEffect(()=>{
      fetchFavoritos()
    })


  return (<>
  <Header/>
  <div className="bg-blue-950 py-5">
    {favorites.length > 0 ? favorites.map((fav, index) => {
            return <Card {...fav} key={index} />
        }) : <p className="text-white text-center text-xl px-1">Você não adicionou nenhuma viagem aos favoritos!</p>
         }
    </div>
    </>
  );
}

export default Favoritos;
