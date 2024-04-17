import React, { useContext } from "react";
import {paises} from "../../paises"
import coracaoVazio from "../../assets/coracao.png"
import coracaoPreenchido from "../../assets/coracaoPreenchido.png"
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { AuthContext } from "../../context/auth";

export default function Card({id, pais, cidade, date, nota, descricao}){
    const {favorites, addToFavorites, removeFromFavorites} = useContext(AuthContext)
    
    const favoritesChecker = (id)=>{
        const boolean = favorites.some((viagem)=> viagem.id === id)
        return boolean
    }
    
    return(
            <div className="bg-slate-300 relative rounded-xl m-5 p-2 break-keep text-left md:w-2/3 md:my-5 md:mx-auto">
                    <div>
                {!favoritesChecker(id) ? (
                <img src={coracaoVazio} alt="Favorito" className="cursor-pointer top-2 absolute right-2 w-5" onClick={() => addToFavorites(id, pais, cidade, date, nota, descricao)}/>
            ) : (
                <img src={coracaoPreenchido} alt="Favorito" className="cursor-pointer top-2 absolute right-2 w-5" onClick={() => removeFromFavorites(id, pais, cidade, date, nota, descricao)}/>
            )}
                    </div>
                <div className="flex justify-around items-center">
                <h3 className="text-amber-500 font-bold text-2xl">{pais}</h3>
                {paises
                    .filter((country) => country.nome === pais)
                    .map((country) => (
                        <img
                        key={country.sigla}
                        alt={country.nome}
                        src={`https://flagsapi.com/${country.sigla}/flat/64.png`}
                        className="opacity-40"
                        />
                    ))}
                    </div>
                <p className="text-blue-950 text-xl">{cidade}</p>
                    <p className="text-blue-950 text-base">{date} </p>
                    <Rating value={nota} 
                    read-only="true"
                    style={{color: "rgb(23 37 84)"}}
                    emptyIcon={<StarIcon style={{ opacity: 1 }}/>}/>
                    <p className="text-sm text-blue-950 italic">"{descricao}"</p>
                
        </div>
    )
} 