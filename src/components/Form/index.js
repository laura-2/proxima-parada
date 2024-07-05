import React, { useContext} from "react";
import { paises } from "../../paises";
import { Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../context/auth";


export default function Form(){
    const {handleChange, handleSubmit, formData, error} = useContext(AuthContext)
    const { control} = useForm();

    return (
        <form className="bg-blue-950 text-white pt-10 pb-1 break-keep" onSubmit={handleSubmit}>
            <h2 className="pb-5 text-2xl mb-2 text-amber-500 text-center font-bold">Compartilhe sua experiência também!</h2>
            <div className="block text-center my-3">
            <select type="select" className="text-sm font-thin block bg-transparent border-2 rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto md:w-4/12" placeholder="Selecione o país"
             name="country" value={formData.country} onChange={handleChange}>
                {paises.map(country => (
                    <option key={country.nome} value={country.nome} 
                    className="text-white text-sm bg-blue-950">
                    {country.nome}
                    </option>
                ))}
            </select>
            <p className="text-amber-500 m-2">{error.country}</p>
            <input type="text" className="text-sm block border-2 bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto md:w-4/12" placeholder="Digite o nome da cidade"
             name="city" value={formData.city} onChange={handleChange}/>
             <p className="text-amber-500 m-2">{error.city}</p>
            <input type="date" placeholder="dd/mm/aaaa" className="text-sm font-thin block bg-transparent rounded-2xl border-white p-3
         w-2/3 text-white self-center my-5 m-auto border-2 calendar-picker-indicator:hidden appearance-none md:w-4/12" name="date" 
         value={formData.date} onChange={handleChange}/>
         <p className="text-amber-500 m-2">{error.date}</p>
         <div className="flex flex-col w-2/3 justify-center items-center my-5 mx-auto">
            <p className="text-white text-base">Classificação:</p>
            <Controller
                        name="rating"
                        control={control}
                    
                        
                        render={({ field }) => (
                            <Rating
                                {...field}
                                name="rating"
                                size="large"
                                type='number'
                                onChange={handleChange}
                                value={formData.rating}
                                style={{ color: "white" }}
                            />
                        )}
                    />
                            <p className="text-amber-500 m-2">{error.rating}</p>
            
         </div>
            <textarea className="font-thin block border-2 bg-transparent rounded-2xl w-2/3 h-40 p-3 m-auto text-white placeholder:bg-transparent text-white overflow-y-hidden md:w-4/12" placeholder="Conte com mais detalhes sua experiência, por exemplo, o que mais gostou, dicas, preços..."
             name="description" type="text" onChange={handleChange} value={formData.description}
             ></textarea>
             {error.description &&<p className="text-amber-500 m-2">{error.description}</p>}
            <button type="submit" className="text-white bg-amber-500 p-3 my-5 rounded-xl uppercase"
          >Compartilhar</button>
            </div>
        </form>
    )
}