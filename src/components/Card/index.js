import React, { useContext } from "react";
import {paises} from "../../paises"
import { FavoritosContext } from "../../context/Favoritos";
import coracaoVazio from "../../assets/coracao.png"
import coracaoPreenchido from "../../assets/coracaoPreenchido.png"
import star from "../../assets/estrela.png"

export default function Card({id, pais, cidade, date, nota, descricao}){
    const {favorites, addToFavorites, removeFromFavorites} = useContext(FavoritosContext)
    
    const favoritesChecker = (id)=>{
        const boolean = favorites.some((viagem)=> viagem.id === id)
        return boolean
    }
    
    return(
            <div className="bg-slate-300 relative rounded-xl m-5 p-2 break-keep min-h-56 h-auto">
                    <div className="h-8">
                {!favoritesChecker(id) ? (
                <img src={coracaoVazio} alt="Favorito" className="cursor-pointer h-7 pt-2 absolute right-8" onClick={() => addToFavorites(id, pais, cidade, date, nota, descricao)}/>
            ) : (
                <img src={coracaoPreenchido} alt="Favorito" className="cursor-pointer h-7 pt-2 absolute right-8" onClick={() => removeFromFavorites(id, pais, cidade, date, nota, descricao)}/>
            )}
                    </div>
                    {paises
                    .filter((country) => country.nome === pais)
                    .map((country) => (
                        <img
                        key={country.sigla}
                        alt={country.nome}
                        src={`https://flagsapi.com/${country.sigla}/flat/64.png`}
                        className="static opacity-35 w-1/3 ml-48"
                        />
                    ))}
                <div className="absolute z-10 top-0 flex flex-col text-left justify-center p-5 gap-2">
                <h3 className="text-blue-950 font-bold text-3xl break-keep">{pais}</h3>
                <p className="text-black text-2xl
                    font-bold">{cidade}</p>
                    <p className="text-black text-base
                    font-bold">{date} </p>
                    <img src={star} alt="Classificação" className="w-6"/>
                    <p className="text-base text-black italic">"{descricao}"</p>
                    </div>
        </div>
    )
} 