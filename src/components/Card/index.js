import React, { useContext } from "react";
import {paises} from "../../paises"
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { AuthContext } from "../../context/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Card({_id, country, city, date, rating, description}){
    const {user, favList, addToFavorites, removeFromFavorites} = useContext(AuthContext)
    const isFavorito = Array.isArray(favList) && user.favList.some(favorito => favorito._id === _id);
    const isFav = Array.isArray(favList) && favList.some(favorito => favorito._id === _id);
    return(
            <div className="bg-slate-300 relative rounded-xl m-5 p-2 break-keep text-left md:w-2/3 md:my-5 md:mx-auto">
                    <div>
                {!isFavorito && !isFav ? (
                <FaRegHeart style={{color: "rgb(23 37 84)"}} className="cursor-pointer top-2 absolute right-2" onClick={() => addToFavorites({_id, country, city, date, rating, description})}/>
            ) : (
                <FaHeart style={{color: "rgb(23 37 84)"}} className="cursor-pointer top-2 absolute right-2" onClick={() => removeFromFavorites(_id)}/>
            )}
                    </div>
                <div className="flex justify-around items-center">
                <h3 className="text-amber-500 font-bold text-2xl">{country}</h3>
                {paises
                    .filter((c) => c.nome === country)
                    .map((c) => (
                        <img
                        key={c.sigla}
                        alt={c.nome}
                        src={`https://flagsapi.com/${c.sigla}/flat/64.png`}
                        className="opacity-40"
                        />
                    ))}
                    </div>
                <p className="text-blue-950 text-xl">{city}</p>
                    <p className="text-blue-950 text-base">{date} </p>
                    <Rating value={rating} 
                    read-only="true"
                    style={{color: "rgb(23 37 84)"}}
                    emptyIcon={<StarIcon style={{ opacity: 1 }}/>}/>
                    <p className="text-sm text-blue-950 italic">"{description}"</p>
                
        </div>
    )
} 