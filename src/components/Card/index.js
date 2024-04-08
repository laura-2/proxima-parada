import React, { useContext } from "react";
import {paises} from "../../paises"
import { FavoritosContext } from "../../context/Favoritos";
import coracaoVazio from "../../assets/coracao.png"
import coracaoPreenchido from "../../assets/coracaoPreenchido.png"

export default function Card({id, pais, cidade, date, nota, descricao}){
    const {favorites, addToFavorites, removeFromFavorites} = useContext(FavoritosContext)
    
    const favoritesChecker = (id)=>{
        const boolean = favorites.some((viagem)=> viagem.id === id)
        return boolean
    }
    
    return(
            <div className="bg-white rounded-xl m-5 p-2 shadow-2xl break-keep">
                <div className="text-center">
                    <div className="h-8">
                {!favoritesChecker(id) ? (
                <img src={coracaoVazio} alt="Favorito" className="cursor-pointer h-7 pt-2 absolute right-8" onClick={() => addToFavorites(id, pais, cidade, date, nota, descricao)}/>
            ) : (
                <img src={coracaoPreenchido} alt="Favorito" className="cursor-pointer h-7 pt-2 absolute right-8" onClick={() => removeFromFavorites(id, pais, cidade, date, nota, descricao)}/>
            )}
            </div>
                <div className="flex gap-3 justify-center items-center">
                <h3 className="text-center text-amber-500 font-bold text-xl break-keep">{pais}</h3>
                <div>
                {paises
                    .filter((country) => country.nome === pais)
                    .map((country) => (
                        <img
                        key={country.sigla}
                        alt={country.nome}
                        src={`https://flagsapi.com/${country.sigla}/flat/64.png`}
                        />
                    ))}
                    </div>
                    </div>
                    <p className="py-1">Data da viagem: <strong className="text-center text-blue-950 text-xl
                    font-bold">{date}</strong> </p>
                    <p className="py-1 px-4">Cidade: <strong className="text-center text-blue-950 text-xl
                    font-bold">{cidade}</strong></p>
                    <p className="py-1">Avaliação: <strong className="text-center text-blue-950 text-xl
                    font-bold">{nota}</strong></p>
                </div>
            <div>
            <div className="flex gap-2 justify-center">
            <p className="py-1 px-4">Comentário: <strong className="text-base text-blue-950">{descricao}</strong></p>
                    </div>
                    </div>
        </div>
    )
} 