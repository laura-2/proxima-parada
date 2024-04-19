import React, { useContext } from "react";
import {paises} from "../../paises"
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { AuthContext } from "../../context/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Card({id, pais, cidade, date, nota, descricao}){
    const {user, addToFavorites, removeFromFavorites} = useContext(AuthContext)
    const isFavorito = user.favorites.some(favorito => favorito.id === id);

    
    return(
            <div className="bg-slate-300 relative rounded-xl m-5 p-2 break-keep text-left md:w-2/3 md:my-5 md:mx-auto">
                    <div>
                {!isFavorito ? (
                <FaRegHeart style={{color: "rgb(23 37 84)"}} className="cursor-pointer top-2 absolute right-2" onClick={() => addToFavorites({id, pais, cidade, date, nota, descricao})}/>
            ) : (
                <FaHeart style={{color: "rgb(23 37 84)"}} className="cursor-pointer top-2 absolute right-2" onClick={() => removeFromFavorites(id)}/>
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