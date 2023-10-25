import { createContext, useState } from "react";
import { deleteFavorito, postFavorito } from "../servicos/favoritos";

export const FavoritosContext = createContext();
FavoritosContext.displayName = "Favoritos";

export const FavoritosProvider =({ children }) =>{
    const [favorites, setFavorites] = useState([]);

    const addToFavorites =(viagem)=> {
      const oldFavorites = [...favorites]
      const newFavorites = oldFavorites.concat(viagem)
      if (!favorites.includes(viagem)) {
        setFavorites([...newFavorites, viagem]);
        postFavorito(viagem)
      }
      alert("Você adicionou esta viagem a sua lista de favoritos!")
      };
    
    const removeFromFavorites =(id)=> {
      const oldFavorites = [...favorites]
      const newFavorites = oldFavorites.filter((viagem)=> viagem.id !== id)
      setFavorites(newFavorites)
      deleteFavorito(id)  
    };
    return (
        <FavoritosContext.Provider
            value={{ favorites,setFavorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritosContext.Provider>
    )
}
